import { HANDLER, handlerForRequest } from '../src/handler';

const _delay = async (sleepMS: number): Promise<void> => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve();
        }, sleepMS);
    });
};

async function _attemptRequest(
    handler: HANDLER,
    request: Request,
    retryCount = 3,
): Promise<Response> {
    for (let i = 0; i < retryCount; i++) {
        const response = await handler(request);
        if (response.status === 200) {
            return response;
        }
        await _delay(3000);
    }
    throw new Error(`Failed to get 200 response`);
}

describe('handle', () => {
    test('handle :GET/sms', async () => {
        const request = new Request('https://localhost/sms', { method: 'GET' });
        const handler = handlerForRequest(request);
        expect(handler).not.toBeFalsy();
        const result = await handler(request);
        const body = await result.text();

        expect(body).toBe(
            '<?xml version="1.0" encoding="UTF-8"?><Response><Message>Hello World sms</Message></Response>',
        );
    }, 10000);

    test('handle :GET/voice', async () => {
        const request = new Request('https://localhost/voice', { method: 'GET' });
        const handler = handlerForRequest(request);
        expect(handler).not.toBeFalsy();
        const result = await handler(request);
        const body = await result.text();

        expect(body).toBe(
            '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Hello World voice</Say></Response>',
        );
    }, 10000);
});

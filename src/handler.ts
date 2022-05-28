import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

export type HANDLER = (request: Request) => Promise<Response>;

async function handlerMessage(request: Request): Promise<Response> {
    const message = new MessagingResponse();
    message.message('Hello World sms');
    const response = new Response(message.toString(), {
        headers: {
            'Content-Type': 'text/xml',
        },
    });
    return Promise.resolve(response);
}

async function handlerVoice(request: Request): Promise<Response> {
    const message = new VoiceResponse();
    message.say('Hello World voice');
    const response = new Response(message.toString(), {
        headers: {
            'Content-Type': 'text/xml',
        },
    });
    return Promise.resolve(response);
}

async function handlerError(request: Request): Promise<Response> {
    console.log(`Got message: ${JSON.stringify(request)}`);
    return Promise.resolve(
        new Response('Unexpected request', {
            status: 404,
        }),
    );
}

export function handlerForRequest(request: Request): HANDLER {
    if (request.url.endsWith('/sms')) {
        return handlerMessage;
    } else if (request.url.endsWith('/voice')) {
        return handlerVoice;
    } else {
        return handlerError;
    }
}

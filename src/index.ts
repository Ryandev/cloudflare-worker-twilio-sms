import { handlerForRequest } from './handler';

addEventListener('fetch', async event => {
    try {
        const handler = handlerForRequest(event.request);

        const response = handler(event.request);

        event.respondWith(response);
    } catch (error) {
        const response = new Response(`Failed to handle request, error: ${JSON.stringify(error)}`, {
            status: 500,
        });
        event.respondWith(response);
    }
});

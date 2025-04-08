import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // to prevent infinite loop of requests intercepting each other
    if (!event.url.pathname.startsWith('/api/auth-user')){
        try {
            const req2 = await event.fetch('/api/auth-user', {
                method: 'GET',
                credentials: 'include'
            });
            const {user} = await req2.json();
            event.locals.user = {
                username: user.Username,
                id: user.ID
            }
        } catch (e) {
            console.log('akalna khara');
        }
    }


    return resolve(event);

};

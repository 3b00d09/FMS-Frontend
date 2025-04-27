import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // to prevent infinite loop of requests intercepting each other
    
    try {
        const req = await event.fetch('https://api.fmsatiya.live/auth-user', {
            method: 'GET',
            credentials: 'include'
        });
        const {user} = await req.json();
        if (user.ID === ""){
            event.locals.user = null
        }
        else{
            event.locals.user = {
                username: user.Username,
                id: user.ID
            }
        }


    } catch (e) {
        event.locals.user = null
    }
    


    return resolve(event);

};

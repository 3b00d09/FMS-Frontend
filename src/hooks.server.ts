// hooks.server.ts is called on every request
// this file is utilised to update the user state so every route can access it
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    try {
        const req = await event.fetch('https://api.fmsatiya.live/auth-user', {
            // necessary for cookies to be read by the api
            credentials: 'include'
        });
        const res = await req.json();
        // if the request has an error, a user object won't exist
        if(res.error){
            event.locals.user = null;
        }
        else{
            // set the user object
            const user = res.user
            event.locals.user = {
                username: user.username,
                id: user.id
            }
        }


    } catch (e) {
        // there was a problem reaching the api here so user is set to null
        event.locals.user = null
    }
    


    return resolve(event);

};

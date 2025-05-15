import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // to prevent infinite loop of requests intercepting each other
    
    try {
        const req = await event.fetch('https://api.fmsatiya.live/auth-user', {
            credentials: 'include'
        });
        const {user} = await req.json();
        if (user.id === ""){
            event.locals.user = null
        }
        else{
            event.locals.user = {
                username: user.username,
                id: user.id
            }
        }


    } catch (e) {
        console.log(e)
        event.locals.user = null
    }
    


    return resolve(event);

};

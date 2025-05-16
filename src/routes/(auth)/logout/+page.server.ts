import { isRedirect, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async ({ fetch, locals, cookies }) => {

    // if a request is made to the logout route when a user doesn't exist then logout shouldn't process
    if(!locals.user){
        return redirect(301, "/login")
    }
    
    try{
        const req = await fetch("https://api.fmsatiya.live/logout")
        // server returns 401 if a request to logout was made without a session_token cookie
        if (req.status === 401){
            return redirect(301, "/login")
        }

        // delete the cookie and set the user object to null
        locals.user = null
        cookies.set("session_token", "", {
            path:"/",
            sameSite: "lax",
            httpOnly: true,
            domain:"fmsatiya.live",
            maxAge:0,
        })
        return redirect(301, "/login")
        
    }
    catch (e){
        // sveltekit THROWS redirects, have to check if the error caught is a redirect or not 
        // if its a redirect error that means it needs to be thrown again so it works
        if (isRedirect(e)){
            throw e
        }
    }
};

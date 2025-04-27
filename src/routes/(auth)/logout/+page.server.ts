import { isRedirect, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async ({ fetch, locals, cookies }) => {

    const sessionId = cookies.get('session_token');
    if (sessionId === undefined || sessionId === null || sessionId === '') {
        return redirect(307, "/login");
    }
    
    try{
        const req = await fetch("https://api.fmsatiya.live/logout")
        if (req.status === 202){
            locals.user = null
            cookies.set("session_token", "", {
				path:"/",
				expires:new Date(0),
				sameSite: "lax",
				httpOnly: true,
			})

            return redirect(308, "/login")

        }

    }
    catch (e){
        // sveltekit THROWS redirects so i have to check if the error caught is a redirect or not 
        // if its a redirect error that means we need to throw again so it works :D
        if (isRedirect(e)){
            throw e
        }
        else{
            console.log("ERROR LOG OUT: ", e)
        }
    }
};

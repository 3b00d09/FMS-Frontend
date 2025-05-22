import { isRedirect, redirect, type Actions } from "@sveltejs/kit";

export const load = async({locals})=>{
	// if a user object already exists, register should redirect to the homepage
	if(locals.user){
		return redirect(301, "/")
	}
}


export const actions:Actions = {
    default:async({request, fetch, cookies})=>{

        // read form data
        const data = await request.formData();

        const username = data.get('username') as string;
        const password = data.get('password') as string;
        const repeatPassword = data.get("repeat-password") as string;

        // submitted form with empty fields
        if(username.trim().length === 0 || password.trim().length === 0 || repeatPassword.trim().length === 0){
            return{
                error: true,
                message: "Mandatory fields required."
            }
        }

        if(password != repeatPassword){
            return{
                error: true,
                message: "Passwords don't match"
            }
        }

        try{
            const req = await fetch("https://api.fmsatiya.live/register",{
                method:"Post",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({username, password})
            })

            // 401 is HTTP code for unauthorised which is returned when the user makes a request to the register endpoint with missing username / password
			if (req.status === 401){
				return{
					error: true,
					message: "Missing form data."
				}
			}

            const res = await req.json()
            // either user creation, session creation, or both can fail here
            if(res.error){
                // if user was created but session was not, redirect to login so the user can try to login and create a session from there
                if(res.failedAt === "session"){
                    return redirect(301, "/login")
                }

                // other fails
                return{
                    error: true,
                    message: res.error
                }
            }

            // if nothing fails, session token is created
            cookies.set("session_token", res.session.ID, {
                path:"/",
                expires:new Date(res.session.ExpiresAt * 1000),
                sameSite: "lax",
                httpOnly: true,
                domain:"fmsatiya.live"
            })
            return redirect(301, "/dashboard")
        }

        // sveltekit throws redirects so they must be throw again here to work
        catch(e){
            if(isRedirect(e)){
                throw e
            }
            // at this point there was an error reaching the api itself
            return{
                error: true,
                message: "Service cannot be reached. Please try again later."
            }
        }

    }
}
import { isRedirect, redirect, type Actions } from "@sveltejs/kit";

export const actions:Actions = {
    default:async({request, fetch, cookies})=>{
        const data = await request.formData();

        const username = data.get('username') as string;
        const password = data.get('password') as string;
        const repeatPassword = data.get("repeat-password")

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
            const res = await req.json()

            if(res.error){
                return{
                    error: true,
                    message: res.error
                }
            }
            cookies.set("session_token", res.session.ID, {
                path:"/",
                expires:new Date(res.session.ExpiresAt * 1000),
                sameSite: "lax",
                httpOnly: true,
                domain:"fmsatiya.live"
            })
            return redirect(308, "/dashboard")
        }
        catch(e){
            if(isRedirect(e)){
                throw e
            }
            return{
                error: true,
                message: "Service cannot be reached. Please try again later."
            }
        }

    }
}
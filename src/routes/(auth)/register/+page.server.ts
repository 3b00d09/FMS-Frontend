import type { Actions } from "@sveltejs/kit";

export const actions:Actions = {
    default:async({request, fetch})=>{
        const data = await request.formData();

        const username = data.get('username') as string;
        const password = data.get('password') as string;
        const repeatPassword = data.get("repeat-password")

        if(password != repeatPassword){
            return{
                success: false,
                message: "Passwords don't match"
            }
        }

        const req = await fetch("/api/register",{
            method:"Post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({username, password})
        })

        const res = await req.json()
        console.log(res)
    }
}
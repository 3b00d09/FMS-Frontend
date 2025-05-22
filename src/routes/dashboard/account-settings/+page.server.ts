import { isRedirect, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load:PageServerLoad = ({locals}) =>{
    if(!locals.user){
        return redirect(301, "/login")
    }

    return{
        user: locals.user
    }
}

export const actions:Actions = {
    changePassword:async({request, locals, fetch})=>{
        if(!locals.user){
            return redirect(301, "/login")
        }
        const data = await request.formData()
        const password = data.get("current-password")
        const newPassword = data.get("new-password")
        const confirmNewPassword = data.get("confirm-new-password")

        if(!password || !newPassword || !confirmNewPassword){
            return{
                error: true,
                message: "All password fields required"
            }
        }

        // no need to rebuild form data like how file uploading works as the form data we send is the exact same as the one we recieve from the client
        try{
            const req = await fetch(`https://api.fmsatiya.live/change-password`,{
                method:"POST",
                body: data
            })
            if(req.status === 200){
                return{
                    success: true,
                    message: "Password changed successfully"
                }
            }
            else if (req.status === 422){
                const res = await req.json()
                return{
                    error: true,
                    message: res.error
                }
            }
            else if (req.status === 401){
                return redirect(301, "/login")
            }
            else{
                return{
                    error: true,
                    message: "something went wrong. please try again later"
                }
            }
        }

        catch(e){
            if(isRedirect(e)){
                throw e
            }
            return{
                error: true,
                message: "Service unavailable. please try again later or contact support"
            }
        }
    },
    changeUsername: async({locals, request, fetch})=>{
        if(!locals.user){
            return redirect(301, "/login")
        }

        const data = await request.formData()
        if(!data.get("username")){
            return{
                error: true,
                message: "username field is required"
            }
        }

        try{
            const req = await fetch("https://api.fmsatiya.live/change-username",{
                method:"POST",
                body: data
            })
            if(req.status === 200){
                return{
                    success: true,
                    message: "username updated succesfully",
                }
            }
            // username field has invalid data
            else if (req.status === 422){
                const res = await req.json()
                return{
                    error: true,
                    message: res.error
                }
            }
            // username is taken
            else if(req.status===409){
                return{
                    error: true,
                    message: "username taken"
                }
            }
            else if (req.status === 401){
                return redirect(301, "/login")
            }
            return{
                error: true,
                message: "username updated failed. please try again or contact support"
            }
            
        }
        catch(e){
            if(isRedirect(e)){
                throw e
            }
            return{
                error: true,
                message: "service unavilable. please try again later or contact support"
            }
        }
    },
    deleteAccount:async({locals, fetch})=>{
        if(!locals.user){
            return redirect(301, "/login")
        }

        try{
            const req = await fetch("https://api.fmsatiya.live/delete-account",{
                method: "DELETE"
            })
            console.log(req.status)
            if(req.status === 200){
                return{
                    success: true,
                    message: "Account deleted."
                }
            }
            else if (req.status === 401){
                return redirect(301, "/login")
            }
            else{
                return{
                    error: true,
                    message: "account delete failed. please try again later or contact support"
                }
            }
        }

        catch(e){
            if(isRedirect(e)){
                throw e
            }
            return{
                error: true,
                message: "service unavailable. please try again or contact support"
            }
        }
    }
}
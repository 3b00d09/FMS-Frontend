import type { organisation } from "$lib/types";
import { isRedirect, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load:LayoutServerLoad = async ({ locals, fetch }) => {

    try{
        const req = await fetch("https://api.fmsatiya.live/owned-org")
        if(req.status === 202){
            const res = await req.json()
            const org = res.org as organisation
            if(org.id.length === 0){
                return{
                    user: locals.user,
                    ownedOrg: null
                }
            }
            const req2 = await fetch("https://api.fmsatiya.live/view-org-members")
            const res2 = await req2.json()
            console.log(res2)
            return {
                user:locals.user,
                ownedOrg: org
            }
        }
        else if (req.status === 401){
            return redirect(301, "/login")
        }

    }
    catch(e){
        if (isRedirect(e)){
            throw e
        }
        else{
            // do something here
        }
        
    }

};

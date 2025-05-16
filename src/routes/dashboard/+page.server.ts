import type { joinedOrganisation, organisation } from "$lib/types";
import { isRedirect, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async ({ locals, fetch }) => {
    // if user object is null this route should not be viewed
    if(!locals.user){
        return redirect(301, "/login")
    }

    try{
        const req = await fetch("https://api.fmsatiya.live/view-user-orgs")
        const res = await req.json()
        // pre-set to null because the api can return null
        let ownedOrg: organisation | null = null
        let joinedOrgs: joinedOrganisation[] | null = null

        // set the data only if it exists
        if(res.ownedOrg) ownedOrg = res.ownedOrg
        if(res.joinedOrgs) joinedOrgs = res.joinedOrgs
        
        return{
            user: locals.user,
            ownedOrg,
            joinedOrgs,
        }

    }
    catch(e){
        if (isRedirect(e)){
            throw e
        }
        else{
            return{
                error: true,
                message: "Service can't be reached. Please try again later."
            }
        }
        
    }

};

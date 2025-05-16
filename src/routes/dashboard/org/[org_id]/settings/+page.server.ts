import type { organisation, organisationMember } from "$lib/types.js"
import { isRedirect, redirect } from "@sveltejs/kit"

export const load = async({locals, fetch, params}) =>{
    if(!locals.user){
        return redirect(301, "/login")
    }

    const orgId = params.org_id

    if(orgId.length === 0){
        return{
            error: true,
            message: "Missing URL params."
        }
    }

    try{
        const req = await fetch("https://api.fmsatiya.live/owned-org?org_id="+orgId)
        // server returns 401 if the user could not be authenticated
        if(req.status === 401){
            return redirect(301, "/login")
        }
        // server returns 403 if the user is not the owner of the org they are trying to view the settings page for
        else if (req.status === 403){
            return{
                error: true,
                message: "You do not have permission to view this page."
            }
        }

        // user is permitted to view this page
        const res = await req.json()
        return{
            ownedOrg: res.org as organisation,
            members: res.members as organisationMember[],
        }
        
    }
    catch(e){

        if(isRedirect(e)){
            throw e
        }
        return{
            error: true,
            message: "Service can't be reached. Please try again later."
        }
    }
        

}
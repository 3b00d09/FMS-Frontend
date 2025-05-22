import type { organisation } from '$lib/types.js'
import { isRedirect, redirect } from '@sveltejs/kit'

export const load = async({fetch, params, locals}) =>{
    if(!locals.user){
        return redirect(301, "/login")
    }
    const orgId = params.org_id
    try{
        // the server will not return a 202 if the org id is invalid or if the user does not have permission to view this org
        const req = await fetch(`https://api.fmsatiya.live/view-org?org_id=${orgId}`)
        if(req.status !== 202){
            return redirect(301, "/dashboard")
        }
        const res = await req.json()
        return{
            org: res.org as organisation,
            role: res.role as string,
            user: locals.user,
        }
    }
    catch(e){
        if(isRedirect(e)){
            throw e
        }
        return{
            error: e
        }
    }
}
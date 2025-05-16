import type { organisation } from '$lib/types.js'
import { isRedirect, redirect } from '@sveltejs/kit'

export const load = async({fetch, params}) =>{
    const orgId = params.org_id
    try{
        const req = await fetch(`https://api.fmsatiya.live/view-org?org_id=${orgId}`)
        if(req.status !== 202){
            console.log("kaboom")
            return redirect(303, "/dashboard")
        }
        const res = await req.json()
        return{
            org: res.org as organisation,
            role: res.role as string,
        }
    }
    catch(e){
        if(isRedirect(e)){
            console.log("kaboom 2")
            throw e
        }
        return{
            error: e
        }
    }
}
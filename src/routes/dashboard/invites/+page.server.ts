import type { inviteData } from '$lib/types.js'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types.js'

export const load: PageServerLoad = async({fetch, locals})=>{
    if(!locals.user){
        return redirect(301, "/login")
    }

    let invites:inviteData[] | null = null
    try{
        const req = await fetch("https://api.fmsatiya.live/user-invites")
        const res = await req.json()
        if(req.status === 202){
            invites = res.invites
        }

        return{
            invites,
        }
    }
    catch(e){
        console.log(e)
        return {
            invites: null
        }
    }
}
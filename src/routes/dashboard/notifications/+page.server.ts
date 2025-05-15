import type { inviteData } from '$lib/types.js'
import type { PageServerLoad } from './$types.js'

export const load: PageServerLoad = async({fetch, locals})=>{
    try{
        const req = await fetch("https://api.fmsatiya.live/user-invites")
        const res = await req.json()
        if(req.status === 202){
            return{
                invites: res.invites as inviteData[]
            }
        }
        else{
            return{
                invites: null,
                error: res.error
            }
        }
    }
    catch(e){
        console.log(e)
        return {
            invites: null
        }
    }
}
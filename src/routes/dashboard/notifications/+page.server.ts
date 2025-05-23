import type { notificationData } from '$lib/types.js'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types.js'

export const load: PageServerLoad = async({fetch, locals})=>{
    if(!locals.user){
        return redirect(301, "/login")
    }

    let notifications: notificationData[] | null = null

    try{
        const req2 = await fetch("https://api.fmsatiya.live/notifications")
        const res2 = await req2.json()
        if(req2.status === 200){
            notifications = res2.notifications
        }
        
        return{
            notifications,
        }
    }
    catch(e){
        console.log(e)
        return {
            invites: null
        }
    }
}
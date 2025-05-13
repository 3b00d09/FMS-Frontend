import type { LayoutServerLoad } from "./$types";

export const load:LayoutServerLoad = async ({ locals, fetch }) => {

    const req = await fetch("https://api.fmsatiya.live/owned-org")
    const res = await req.json()
    if(res.data.ID.length === 0){
        return{
            user: locals.user,
            ownedOrg: null
        }
    }
    return {
        user:locals.user,
        ownedOrg: res.data
    }
};

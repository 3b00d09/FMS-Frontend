import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async ({ locals, fetch }) => {

    const req = await fetch("https://api.fmsatiya.live/owned-org")
    const res = await req.json()
    
    return {
        user:locals.user,
        ownedOrg: res.data
    }
};

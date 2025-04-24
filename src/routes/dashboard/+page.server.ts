import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async ({ locals, fetch }) => {

    const req = await fetch("https://api.fmsatiya.live/owned-org")
    const res = await req.json()
    console.log(res)
    return {
        user:locals.user,
        ownedOrg: res.data
    }
};

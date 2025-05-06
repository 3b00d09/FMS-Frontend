import type { LayoutServerLoad } from "./$types";

export const load:LayoutServerLoad = async ({ locals, fetch, params }) => {

    const req = await fetch("https://api.fmsatiya.live/owned-org")
    const res = await req.json()

    return {
        user:locals.user,
        ownedOrg: res.data,
    }
};

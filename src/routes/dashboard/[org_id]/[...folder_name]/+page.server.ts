import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { folderData } from "$lib/types";

export const load:PageServerLoad = async ({ locals, fetch, params }) => {

    const orgId = params.org_id

    const req2 = await fetch("https://api.fmsatiya.live/view-root-folder?org_id=" + orgId)
    const res2= await req2.json()
    let folders: folderData[] = [];

    if(req2.status === 202){
        res2.data.forEach((folder:folderData)=>{
            folders.push(folder)
        })
    }
    return {
        user:locals.user,
        rootFolderData: folders,
    }
};
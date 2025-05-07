import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { folderData } from "$lib/types";

export const load:PageServerLoad = async () => {
    return redirect(301, "/root")
};

export const actions: Actions = {
    uploadFiles: async ({ request, fetch, url }) => {
        const formData = await request.formData();
        const files: File[] = [];
        
        // parse the files one by one, form prefixes files with "file-"
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('file-') && value instanceof File) {
                files.push(value);
            }
        }

        // create a new FormData to send to the go server
        const backendFormData = new FormData();

        // append files
        files.forEach((file, index) => {
            backendFormData.append('files[]', file);
        });

        console.log("---------------------------")
        try{
            const req = await fetch("https://api.fmsatiya.live/upload-test",{
                method:"POST",
                body: backendFormData
            })
            // console.log(req.status)
            // const res = await req.json()
            // console.log(res)
        }
        catch(e){
            console.log("upload explode")
            console.log(e)
        }

        return { success: true };
    },

    uploadFolder:async({request, fetch})=>{
        const formData = await request.formData()
        const folderName = formData.get("folder-name")
        const orgId = formData.get("org-id")
        
        const req = await fetch("https://api.fmsatiya.live/add-folder",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({Name:folderName, Org_id: orgId})
        })

        const res = await req.json()
        console.log(res)


    }
};
import type { Actions } from "@sveltejs/kit";
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

export const actions: Actions = {
    uploadFiles: async ({ request, fetch }) => {
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
            const req = await fetch("/api/upload-test",{
                method:"POST",
                body: backendFormData
            })
            console.log(req.status)
            const res = await req.json()
            console.log(res)
        }
        catch(e){
            console.log(e)
        }

        return { success: true };
    }
};
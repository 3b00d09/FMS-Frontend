import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { folderData, fileData } from "$lib/types";

export const load:PageServerLoad = async ({ locals, fetch, params }) => {

    const folderParams = params.folder_name.split("/")
    const folderName = folderParams[folderParams.length - 1]
    const orgId = params.org_id

    const req2 = await fetch("https://api.fmsatiya.live/view-folder-children?folder_name=" + folderName+"&org_id="+ orgId)
    const res2= await req2.json()
    let folders: folderData[] = [];
    let files: fileData[] = [];

    if(req2.status === 202){
        if(res2.folders && res2.folders.length > 0){
            res2.folders.forEach((folder:folderData)=>{
                folders.push(folder)
            })
        }
        
        if(res2.files && res2.files.length > 0){
            res2.files.forEach((file: fileData)=>{
                files.push(file)
            })
        }

    }
    return {
        user:locals.user,
        folderData: folders,
        fileData: files,
        parentFolders: folderParams
    }
};


export const actions: Actions = {
    uploadFiles: async ({ request, fetch, url, params }) => {
        const parentFolderName = params.folder_name?.split("/")
        console.log(parentFolderName)
        const orgId = params.org_id
        // good ol' typechecking
        if(!parentFolderName || !orgId || parentFolderName?.length === 0 || orgId?.length === 0){
            console.log("MISSING ARGS FOR FILE UPLOAD")
            return;
        } 
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
        backendFormData.append('orgId', orgId)
        backendFormData.append('parentFolderName', parentFolderName[parentFolderName.length - 1])

        try{
            const req = await fetch(`https://api.fmsatiya.live/upload-test`,{
                method:"POST",
                body: backendFormData
            })
            const res = await req.json()
            console.log(res)
        }
        catch(e){
            console.log("upload explode")
            console.log(e)
        }

        return { success: true };
    },

    uploadFolder:async({request, fetch, params})=>{
        const formData = await request.formData()
        const folderName = formData.get("folder-name")
        const orgId = formData.get("org-id")
        const parentFolderName = params.folder_name?.split("/")

        if(!parentFolderName || parentFolderName.length === 0){
            return;
        }
        
        const req = await fetch(`https://api.fmsatiya.live/add-folder?parent-folder=${parentFolderName[parentFolderName.length - 1]}`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({Name:folderName, Org_id: orgId,})
        })

        const res = await req.json()
        console.log(res)


    }
};
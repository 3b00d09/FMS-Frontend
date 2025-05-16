import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { folderData, fileData } from "$lib/types";

export const load:PageServerLoad = async ({ locals, fetch, params }) => {
    if(!locals.user){
        return redirect(301, "/login")
    }

    // get the data from url parameters
    const folderParams = params.folder_name.split("/")
    const folderName = folderParams[folderParams.length - 1]
    const orgId = params.org_id

    // variables to hold data
    let folders: folderData[] = [];
    let files: fileData[] = [];

    const req = await fetch("https://api.fmsatiya.live/view-folder-children?folder_name=" + folderName+"&org_id="+ orgId)
    // if the server was unable to authenticate the user
    if(req.status === 401){
        return redirect(301, "/login")
    }

    // if the user attempts to view an org they don't belong to
    else if(req.status === 403){
        return{
            error: true,
            message: "You do not have permission to view this org",
        }
    }

    const res= await req.json()

    // if data exists, iterate over and append
    if(res.folders && res.folders.length > 0){
        res.folders.forEach((folder:folderData)=>{
            folders.push(folder)
        })
    }
        
    if(res.files && res.files.length > 0){
        res.files.forEach((file: fileData)=>{
            files.push(file)
        })
    }

    return {
        user:locals.user,
        folderData: folders,
        fileData: files,
        parentFolders: folderParams
    }
}

export const actions: Actions = {
    uploadFiles: async ({ request, fetch, params }) => {
        const parentFolderName = params.folder_name?.split("/")
        const orgId = params.org_id
        // good ol' typechecking
        if(!parentFolderName || !orgId || parentFolderName?.length === 0 || orgId?.length === 0){
            return{
                error: true,
                message: "Missing URL params. Please refresh the page and try again."
            }
        } 
        const formData = await request.formData();
        const file = formData.get("file")
        if(!file || !(file instanceof File)){
            return{
                error: true,
                message: "No file detected."
            }
        }

        // create a new FormData to send to the go server
        const backendFormData = new FormData();

        // append file and necessary data
        backendFormData.append('file', file);
        backendFormData.append('orgId', orgId)
        backendFormData.append('parentFolderName', parentFolderName[parentFolderName.length - 1])

        try{
            const req = await fetch(`https://api.fmsatiya.live/add-file`,{
                method:"POST",
                body: backendFormData
            })
            if(req.status === 202){
                return{
                    success: true,
                    message: "File Uploaded successfully."
                }
            }
        }
        catch(e){
            return{
                error: true,
                message: e,
            }
        }
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


    },


    deleteFile:async({request, fetch})=>{
        const data = await request.formData()
        const fileId = data.get("file-id")
        if(!fileId){
            return{
                error: true,
                message: "Cannot perform operation. Please refresh the page and try again."
            }
        }

        try{
            const req = await fetch(`https://api.fmsatiya.live/delete-file?&file-id=${fileId}`)
            const res = await req.json()
            if(res.error){
                return{
                    error: true,
                    message: res.error
                }
            }
        }
        catch(e){
            return{
                error: true,
                message: "Service could not be reached. Please try again later."
            }
        }
    }
};
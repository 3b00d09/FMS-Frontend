import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { folderData, fileData } from "$lib/types";
import { allowedFileTypes, invalidChars, maxFileSize } from "$lib/helpers";

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
    uploadFile: async ({ request, fetch, params }) => {
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

        if (!allowedFileTypes.includes(file.type)) {
            return {
                error: true,
                message: "File type not supported. Please upload PDF, DOC, DOCX, JPG, or PNG files"
            }
        }

        // validate file size
        if (file.size > maxFileSize){
            return{
                error: true,
                message: "uploaded limit exceeded. maximum file size is 10mb"
            }
        }

        if(invalidChars.test(file.name)){
            return{
                error: true,
                message: "file name contains invalid characters"
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
            // 400 means the form data was incorrect
            if (req.status === 400){
                return{
                    error: true,
                    message: "File upload failed. Please refresh the page and try again"
                }
            }
            // server returns 409 if a file name already exists in the current location
            else if (req.status === 409){
                return{
                    error: true,
                    message: "File name already exists in this location"
                }
            }
            else if(req.status === 403){
                return{
                    error: true,
                    message: "you do not have permission to carry out this operation"
                }
            }
            // success
            else if(req.status === 200){
                return{
                    success: true,
                    message: "File Uploaded successfully"
                }
            }
            // any other unexpected errors
            else{
                return{
                    error: true,
                    message: "File upload failed"
                }
            }
        }
        catch(e){
            return{
                error: true,
                message: "Service can't be reached. Please try again later.",
            }
        }
    },

    uploadFolder:async({request, fetch, params})=>{
        const formData = await request.formData()
        const folderName = formData.get("folder-name") as string
        const orgId = formData.get("org-id") as string
        const parentFolderName = params.folder_name?.split("/")

        if(!parentFolderName || parentFolderName.length === 0 || orgId.length === 0 || folderName.length === 0){
            return{
                error: true,
                message: "form data is missing. please refresh the page and try again"
            }
        }

        if (!folderName.trim()) {
            return{
                error: true,
                message: "Folder name cannot be empty"
            }
        }
        
        // invalid characters cause conflict
        if (invalidChars.test(folderName)) {
            return{
                error: true,
                message: "Folder name contains invalid characters"
            }
        }

        // a folder with name root will cause conflict
        if (folderName.toLowerCase() === "root"){
            return{
                error: true,
                message: "Folder name cannot be root"
            }
        }
        
        // check if folder name is too long
        if (folderName.length > 255) {
            return{
                error: true,
                message: "Folder name is too long"
            }
        }

        if (folderName === parentFolderName[parentFolderName.length - 1]){
            return{
                error: true,
                message: "folder name cannot be the same as parent folder"
            }
        }

        try{
            const req = await fetch(`https://api.fmsatiya.live/add-folder?parent-folder=${parentFolderName[parentFolderName.length - 1]}`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({Name:folderName, Org_id: orgId,})
            })
    
            // 401 indicates a user tried to create a folder without the necessary permissions to do so
            if (req.status === 401){
                return{
                    error: true,
                    message: "You do not have permission to carry out this operation"
                }
            }
            // server returns 409 if a file name already exists in the current location
            else if (req.status === 409){
                return{
                    error: true,
                    message: "Folder name already exists in this location"
                }
            }

            else if(req.status === 403){
                return{
                    error: true,
                    message: "you do not have permission to carry out this operation"
                }
            }
            // success
            else if (req.status === 200){
                return{
                    success: true,
                    message: "Folder created successfully"
                }
            }
            // service was reached but something unexpected went wrong
            else{
                return{
                    error: true,
                    message: "something went wrong, please try again later or contact support"
                }
            }
        }
        catch(e){
            return{
                error: true,
                message: "Service cannot be reached. Please try again later."
            }
        }

        


    },


    deleteFile:async({request, fetch})=>{
        const data = await request.formData()
        const fileId = data.get("file-id")
        const orgId = data.get("org-id")
        if(!fileId || !orgId){
            return{
                error: true,
                message: "Cannot perform operation. Please refresh the page and try again."
            }
        }

        try{
            const req = await fetch(`https://api.fmsatiya.live/delete-file?org-id=${orgId}&file-id=${fileId}`,{
                method: "DELETE"
            })
            // success
            if(req.status === 200){
                return{
                    success: true,
                    message: "File deleted successfully"
                }
            }

            else if(req.status === 403){
                return{
                    error: true,
                    message: "you do not have permission to carry out this operation"
                }
            }

            else{
                return{
                    error: true,
                    message: "Something went wrong. please try again later or contact support"
                }
            }
        }
        catch(e){
            return{
                error: true,
                message: "Service could not be reached. Please try again later."
            }
        }
    },

    deleteFolder:async({request, fetch})=>{
        const data = await request.formData()
        const folderId = data.get("folder-id")
        const orgId = data.get("org-id")
        if(!folderId || !orgId){
            return{
                error: true,
                message: "Cannot perform operation. Please refresh the page and try again."
            }
        }

        try{
            const req = await fetch(`https://api.fmsatiya.live/delete-folder?org-id=${orgId}&folder-id=${folderId}`,{
                method: "DELETE"
            })
            // success
            if(req.status === 200){
                return{
                    success: true,
                    message: "File deleted successfully"
                }
            }

            else if(req.status === 403){
                return{
                    error: true,
                    message: "you do not have permission to carry out this operation"
                }
            }
            
            else{
                return{
                    error: true,
                    message: "Something went wrong. please try again later or contact support"
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
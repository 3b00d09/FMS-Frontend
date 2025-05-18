<script lang="ts">
    import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
    import { getToastState } from "../Toast.svelte";
	import { allowedFileTypes, invalidChars, maxFileSize } from "$lib/helpers";
    let file = $state<File|null>(null);
    // variable to enable / disable upload button
    let isUploading = $state(false);
    const toastState = getToastState()

    
    function handleFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            // temporary file variable until we pass some validation
            const tmpFile = input.files[0]
            // validate file size and type
            // validation is also done server-side in case the user gets past client valdiation
            if(tmpFile.size > maxFileSize){
                console.log("here?")
                toastState.triggerToast("File size limit exceeded. Maximum file size allowed is 10mb","error", 5000)
                return;
            }

            if (!allowedFileTypes.includes(tmpFile.type)) {
                toastState.triggerToast("File type not supported. Please upload PDF, DOC, DOCX, JPG, or PNG files","error", 5000)
                return;
            }

            if (invalidChars.test(tmpFile.name)) {
                toastState.triggerToast("Folder name contains invalid characters", "error", 3000);
                return;
            }

            file = tmpFile
        }
    }

    function removeFile() {
        file = null
    }

    // using a custom enhance function for the form simply to disable the upload button while the form is still processing as well as resetting form data after upload is done
    const customEnhance: SubmitFunction = ({ cancel }) => {
        if(!file) cancel()
        isUploading = true;
        return async ({ update }) => {
            await update();
            isUploading = false;
            file = null
        };
    };

    
</script>

<form action="?/uploadFile" method="POST" class="w-full max-w-xl" enctype="multipart/form-data" use:enhance={customEnhance}>
    <div class="mb-4 relative">
        <div class="flex items-center">
            <input 
                type="file" 
                name="file" 
                id="fileInput"
                onchange={handleFileSelect}
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div class="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 flex items-center justify-between">
                <div class="flex items-center text-gray-300">
                    <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span id="fileName" class="truncate max-w-xs">{file ? file.name : 'Choose file...'}</span>
                </div>
                <button 
                    type="button" 
                    class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-lg text-sm transition-colors duration-200"
                >
                    Browse
                </button>
            </div>
        </div>
    </div>

    {#if file}
        <div class="flex items-center justify-between">
            <button disabled={isUploading} type="submit" class="flex-grow bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg flex justify-center items-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-gray-600 disabled:opacity-50">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
                <span class="font-medium">Upload</span>
            </button>

            <button aria-label="Remove File" type="button" onclick={removeFile} class="ml-2 bg-gray-700 hover:bg-gray-600 text-red-400 p-3 rounded-lg transition-colors duration-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
        </div>
    {/if}
</form>

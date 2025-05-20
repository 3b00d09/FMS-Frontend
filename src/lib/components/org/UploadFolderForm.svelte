<script lang="ts">
    import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { getToastState } from "../Toast.svelte";
	import { invalidChars } from "$lib/helpers";
    let {orgId} = $props()
    let folderName = $state("");
    let isCreating = $state(false);
    const toastState = getToastState();
    
    function validateFolderName(name: string): boolean {
        // validate empty folder name
        if (!name.trim()) {
            toastState.triggerToast("Folder name cannot be empty", "error", 5000);
            return false;
        }
        
        if (invalidChars.test(name)) {
            toastState.triggerToast("Folder name contains invalid characters", "error", 3000);
            return false;
        }

        // a folder with name root will cause conflict
        if (name.toLowerCase() === "root"){
            toastState.triggerToast("folder name cannot be root", "error", 3000)
            return false;
        }

        if (name.length > 255) {
            toastState.triggerToast("Folder name is too long", "error", 3000);
            return false;
        }
        
        return true;
    }
    
    const customEnhance: SubmitFunction = ({ formData, cancel }) => {
        const name = formData.get("folder-name") as string;
        
        if (!validateFolderName(name)) {
            cancel();
            return;
        }
        
        isCreating = true;
        
        return async ({ update }) => {
            await update();
            isCreating = false;
            folderName = "";
        };
    };
</script>

<form action="?/uploadFolder" method="POST" class="w-full max-w-xl" use:enhance={customEnhance}>
    <input type="hidden" value={orgId} name="org-id"/>
    <div class="mb-4">
        <div class="flex items-center">
            <div class="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 flex items-center">
                <svg class="w-5 h-5 mr-2 flex-shrink-0 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                </svg>
                <input 
                    type="text" 
                    name="folder-name" 
                    placeholder="Enter folder name..."
                    bind:value={folderName}
                    class="bg-transparent border-none w-full text-gray-300 focus:outline-none"
                />
            </div>
        </div>
    </div>

    <div class="flex items-center justify-between">
        <button 
            disabled={isCreating} 
            type="submit" 
            class="flex-grow bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg flex justify-center items-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 "
        >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
            </svg>
            <span class="font-medium">{isCreating ? 'Creating...' : 'Create Folder'}</span>
        </button>
    </div>
</form>
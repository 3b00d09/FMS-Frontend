<script lang="ts">
	import type { fileData } from "$lib/types";
    import { formatDate, formatSize, stripFileType } from "$lib/helpers";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
    let {file, canEdit}: {file:fileData, canEdit: boolean} = $props();

    let isDeleting = $state(false)
    
    const customEnhance: SubmitFunction = ({}) => {
        isDeleting = true;
                
        return async ({ update }) => {
            await update();
            // in case deleting fails then this row wouldn't vanish
            isDeleting = false;
        };
    };
</script>


<div class="grid grid-cols-6 px-2 mt-[-2rem] gap-4 [&>*]:min-w-0 hover:bg-gray-700">
    <div class="flex items-center">
        <i class="fas fa-file mr-2"></i>
        <span class="truncate">{stripFileType(file.name)}</span>
    </div>
    <p>{file.type}</p>
    <p>{formatDate(file.createdAt)}</p>
    <p>{file.uploader}</p>
    <p>{formatSize(file.size)}</p>
    <div class="flex gap-2">
        <button aria-label="Download File" class="text-blue-400 hover:text-blue-300">
            <i class="fas fa-download"></i>
        </button>
        {#if canEdit}
            <form use:enhance={customEnhance} action="?/deleteFile" method="POST">
                <button disabled={isDeleting} type="submit" aria-label="Delete File" class="text-red-400 hover:text-red-300">
                    <i class="fas fa-trash"></i>
                </button>
                <input type="hidden" name="file-id" value={file.id}/>
                <input type="hidden" name="org-id" value={file.orgId}/>
                <input type="hidden" name="file-name" value={file.name}/>
            </form>
        {/if}
        </div>
</div>
<script lang="ts">
	import type { folderData } from "$lib/types";
    import { formatDate, formatSize } from "$lib/helpers";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";

    let {folder, parentFolders, canEdit}:{folder: folderData, parentFolders: string[], canEdit: boolean} = $props()
    let url = parentFolders.join("/")
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


<a data-sveltekit-preload-data=off href={`/dashboard/org/${folder.orgId}/${url}/${folder.name}`} class="grid grid-cols-6 gap-4 px-2 mt-[-2rem] hover:bg-gray-700">
    <div class="flex items-center truncate">
        <i class="fas fa-folder text-indigo-400 mr-2"></i>
        <span>{folder.name}</span>
    </div>
    <p>Folder</p>
    <p>{formatDate(folder.createdAt)}</p>
    <p>{folder.uploader}</p>
    <p>{formatSize(folder.size)}</p>
    {#if canEdit}
        <form use:enhance={customEnhance} action="?/deleteFolder" method="POST">
            <button onclick={(e) => e.stopPropagation()} disabled={isDeleting} type="submit" aria-label="Delete File" class="text-red-400 hover:text-red-300">
                <i class="fas fa-trash"></i>
            </button>
            <input type="hidden" name="folder-id" value={folder.id}/>
            <input type="hidden" name="org-id" value={folder.orgId}/>
            <input type="hidden" name="folder-name" value={folder.name}/>
        </form>
    {/if}
</a>
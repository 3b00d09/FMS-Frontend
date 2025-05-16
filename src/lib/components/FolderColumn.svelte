<script lang="ts">
	import type { folderData } from "$lib/types";
    import { formatDate } from "$lib/helpers";

    let {folder, parentFolders, canEdit}:{folder: folderData, parentFolders: string[], canEdit: boolean} = $props()
    let url = parentFolders.join("/")

</script>


<a data-sveltekit-preload-data=off href={`/dashboard/org/${folder.orgId}/${url}/${folder.name}`} class="grid grid-cols-6 gap-4 px-2 mt-[-2rem] hover:bg-gray-700">
    <div class="flex items-center truncate">
        <i class="fas fa-folder text-indigo-400 mr-2"></i>
        <span>{folder.name}</span>
    </div>
    <p>Folder</p>
    <p>{formatDate(folder.createdAt)}</p>
    <p>{folder.uploader}</p>
    <p>nill</p>
    {#if canEdit}
        <div class="flex gap-2">
            <button aria-label="Delete File" class="text-red-400 hover:text-red-300">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    {/if}
</a>
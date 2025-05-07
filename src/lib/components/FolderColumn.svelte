<script lang="ts">
	import { page } from "$app/state";
	import type { folderData } from "$lib/types";

    let {folder, parentFolders}:{folder: folderData, parentFolders: string[]} = $props()
    let url = parentFolders.join("/")

</script>


{#if url.length === 0}
    <a data-sveltekit-preload-data=off href={`/dashboard/${folder.org_id}/${folder.name}`} class="grid grid-cols-6 px-2 mt-[-2rem] gap-4">
        <p>Folder</p>
        <p>{folder.name}</p>
        <p>{folder.created_at}</p>
        <p>{folder.uploader}</p>
        <p>nill</p>
        <p>Delete</p>
    </a>
{:else}
    <a data-sveltekit-preload-data=off href={`/dashboard/${folder.org_id}/${url}/${folder.name}`} class="grid grid-cols-6 px-2 mt-[-2rem] gap-4">
        <p>Folder</p>
        <p>{folder.name}</p>
        <p>{folder.created_at}</p>
        <p>{folder.uploader}</p>
        <p>nill</p>
        <p>Delete</p>
    </a>
{/if}
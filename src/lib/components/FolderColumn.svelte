<script lang="ts">
	import type { folderData } from "$lib/types";
    import { formatDate, formatSize } from "$lib/helpers";

    let {folder, parentFolders}:{folder: folderData, parentFolders: string[]} = $props()
    let url = parentFolders.join("/")

</script>


<a data-sveltekit-preload-data=off href={`/dashboard/${folder.org_id}/${url}/${folder.name}`} class="grid grid-cols-7 px-2 mt-[-2rem] gap-4">
    <p>Folder</p>
    <p class="truncate">{folder.name}</p>
    <p>Folder</p>
    <p>{formatDate(folder.created_at)}</p>
    <p>{folder.uploader}</p>
    <p>nill</p>
    <p>Delete</p>
</a>
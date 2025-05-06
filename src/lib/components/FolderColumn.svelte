<script lang="ts">
	import type { folderData } from "$lib/types";

    let {folder}:{folder: folderData} = $props()
</script>


<p>Folder</p>
<p>{folder.name}</p>
<p>{folder.created_at}</p>
<p>{folder.uploader}</p>
<p>nill</p>
<p>Delete</p>
<script lang="ts">
	import type { fileData } from "$lib/types";
    import { formatDate, formatSize, stripFileType } from "$lib/helpers";

    let {file}: {file:fileData} = $props();

</script>


<div class="grid grid-cols-7 px-2 mt-[-2rem] gap-4 [&>*]:min-w-0">
    <p>File</p>
    <p class="truncate">{stripFileType(file.name)}</p>
    <p>{file.type}</p>
    <p>{formatDate(file.created_at)}</p>
    <p>{file.uploader}</p>
    <p>{formatSize(file.size)}</p>
    <p>Delete</p>
</div>
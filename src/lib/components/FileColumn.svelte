<script lang="ts">
	import type { fileData } from "$lib/types";
    import { formatDate, formatSize, stripFileType } from "$lib/helpers";

    let {file}: {file:fileData} = $props();

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
        <button aria-label="Delete File" class="text-red-400 hover:text-red-300">
            <i class="fas fa-trash"></i>
        </button>
    </div>
</div>
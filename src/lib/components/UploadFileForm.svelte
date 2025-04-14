<script lang="ts">
    import { enhance } from "$app/forms";

    let files = $state<File[]>([]);
    
    function handleFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            files = [...files, ...Array.from(input.files)];
        }
    }

    function removeFile(index: number) {
        files = files.filter((_, i) => i !== index);
    }

    
</script>

<!--uploading multiple files in a form: https://www.reddit.com/r/sveltejs/comments/1f5d78i/comment/lksgxpc-->
<form action="?/uploadFiles" method="POST" class="max-w-md mx-auto p-4" enctype="multipart/form-data"    
    use:enhance={({ formData }) => {
    // clear any existing file entries that might come from the input
    formData.delete('file');
    
    // add each file with a unique name, server can parse them by checking name starts with "file-"
    files.forEach((file, index) => {
        formData.append(`file-${index}`, file);
    });
}} >

    <div class="mb-4">
        <input
            type="file"
            name="file"
            multiple
            onchange={handleFileSelect}
            class="w-full p-2 border rounded"
        />
    </div>

    <!-- display currently selected files -->
    {#if files.length > 0}
        <div class="mb-4">
            <h3 class="text-lg font-semibold mb-2">Selected Files:</h3>
            <ul class="space-y-2">
                {#each files as file, index}
                    <li class="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span class="text-black">{file.name}</span>
                        <button 
                            type="button"
                            onclick={() => removeFile(index)}
                            class="text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}

    <button 
        type="submit" 
        class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        disabled={files.length === 0}
    >
        Upload
    </button>
</form>

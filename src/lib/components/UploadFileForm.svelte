<script lang="ts">
    import { enhance } from "$app/forms";
    let {orgId} = $props();

    let file = $state<File|null>(null);
    
    function handleFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            file = input.files[0]
        }
    }

    function removeFile() {
        file = null
    }

    
</script>

<form action="?/uploadFiles" method="POST" class="max-w-md px-2" enctype="multipart/form-data" use:enhance>

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
    {#if file}
        <div class="mb-4">
            <h3 class="text-lg font-semibold mb-2">Selected File:</h3>
            <div class="p-2 bg-gray-50 rounded border">
                <div class="flex justify-between items-center">
                    <span class="text-black truncate max-w-[70%]">{file.name}</span>
                    <button 
                        type="button"
                        onclick={removeFile}
                        class="text-red-500 hover:text-red-700"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    {/if}

    <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" disabled={!file}>
        Upload
    </button>
</form>

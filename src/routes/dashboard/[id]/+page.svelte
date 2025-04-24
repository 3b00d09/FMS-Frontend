<script lang="ts">
	import UploadFileForm from "$lib/components/UploadFileForm.svelte";
    import type { PageProps } from "../$types";

    let { data }: PageProps = $props();
    let showUpload = $state(false);
</script>
<h2 class="text-5xl text-primary">{data.ownedOrg.Name}</h2>

<div>Storage Used</div>
<div>Home &gt files</div>

<div>
    <button class="bg-accent text-black p-2 rounded-md" onclick={()=>showUpload = !showUpload}>Upload File</button>
    <button class="bg-accent text-black p-2 rounded-md">Add Folder</button>
</div>


{#if showUpload}
    <UploadFileForm/>
{/if}

<div class="flex justify-between items-center p-2">
    <div>
        <input type="text" placeholder="Search..." class="rounded-md p-2">
    </div>
    <div class="flex gap-2 items-center">
        <div>File Type</div>
        <div>Sort By</div>
    </div>
  
</div>


<div class="grid grid-cols-6 border-b border-placeholderText p-2 rounded-md text-xl">
    <p>Name</p>
    <p>Last Modified</p>
    <p>Modified By</p>
    <p>Uploaded By</p>
    <p>Size</p>

</div>

<div class="grid grid-cols-6 p-2 gap-4">
    <p>file1</p>
    <p>September 9th 2025</p>
    <p>Anon64942495</p>
    <p>Anon</p>
    <p>1.2mb</p>
    <p>Delete</p>

    <p>file2</p>
    <p>September 9th 2025</p>
    <p>Anon64942495</p>
    <p>Anon</p>
    <p>1.2mb</p>
    <p>Delete</p>

    <p>file3</p>
    <p>September 9th 2025</p>
    <p>Anon64942495</p>
    <p>Anon</p>
    <p>1.2mb</p>
    <p>Delete</p>

    <p>file4</p>
    <p>September 9th 2025</p>
    <p>Anon64942495</p>
    <p>Anon</p>
    <p>1.2mb</p>
    <p>Delete</p>
</div>
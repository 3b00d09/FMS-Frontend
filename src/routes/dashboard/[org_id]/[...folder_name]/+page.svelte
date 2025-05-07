<script lang="ts">
	import FolderColumn from "$lib/components/FolderColumn.svelte";
    import { enhance } from "$app/forms";
	import UploadFileForm from "$lib/components/UploadFileForm.svelte";
    import {page} from "$app/state"

    let { data } = $props();
    let showUpload = $state(false);
    let showFolderUpload = $state(false);
    let breadCrumbs = $derived(page.url.pathname.split("/").splice(3));
  
</script>
<h2 class="text-5xl text-primary">{data.ownedOrg.Name}</h2>

<div>Storage Used</div>
<div class="flex gap-2">
    {#each breadCrumbs as crumb, i}
        <a href={page.url.pathname.split('/').slice(0, i+4 || undefined).join('/')}>{decodeURIComponent(crumb)}</a>
        {#if i < breadCrumbs.length - 1}
            <p>&gt</p>
        {/if}
    {/each}
</div>

<div>
    <button class="bg-accent text-black p-2 rounded-md" onclick={()=>showUpload = !showUpload}>Upload File</button>
    <button class="bg-accent text-black p-2 rounded-md" onclick={()=>showFolderUpload = !showFolderUpload}>Add Folder</button>
</div>

{#if showFolderUpload}
    <form use:enhance method="POST" action="?/uploadFolder">
        <input type="text" name="folder-name">
        <input type="hidden" name="org-id" value={data.ownedOrg.ID}>
        <button type="submit">Submit</button>
    </form>
{/if}

{#if showUpload}
    <UploadFileForm orgId={data.ownedOrg.ID}/>
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
    <p></p>
    <p>Name</p>
    <p>Uploaded At</p>
    <p>Uploaded By</p>
    <p>Size</p>
    <p>Action</p>
</div>

{#each data.rootFolderData as folder (folder.id)}
    <FolderColumn folder={folder} parentFolders={data.parentFolders}/>
{/each}
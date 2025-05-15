<script lang="ts">
	import FolderColumn from "$lib/components/FolderColumn.svelte";
    import { enhance } from "$app/forms";
	import UploadFileForm from "$lib/components/UploadFileForm.svelte";
    import {page} from "$app/state"
	import FileColumn from "$lib/components/FileColumn.svelte";
	import { formatSize } from "$lib/helpers.js";

    let { data } = $props();
    let showUpload = $state(false);
    let showFolderUpload = $state(false);
    let breadCrumbs = $derived(page.url.pathname.split("/").splice(4));
  
</script>
{#if data.ownedOrg}
    <h2 class="text-5xl text-primary">{data.ownedOrg?.name}</h2>

    <div class="bg-gray-800 rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-2">Storage Used</h2>
        <div class="w-full bg-gray-700 rounded-full h-4">
            <!--calculate a percentage of the storage used-->
            <div class="bg-pink-500 h-2 rounded" style={`width: ${(data.ownedOrg?.storageUsed / (5 * 1024 * 1024 * 1024)) * 100}%`}></div>
        </div>
        <div class="flex justify-between mt-2 text-sm">
            <span>{formatSize(data.ownedOrg?.storageUsed)} used</span>
            <span>5 GB</span>
        </div>
    </div>

    <div class="flex items-center text-sm bg-gray-800 rounded-lg px-4 py-2 overflow-x-auto gap-2">
        {#each breadCrumbs as crumb, i}
            <a class="text-indigo-400 hover:text-indigo-300 text-xl" href={page.url.pathname.split('/').slice(0, i+5 || undefined).join('/')}>{decodeURIComponent(crumb)}</a>
            {#if i < breadCrumbs.length - 1}
                <span class="text-accent">/</span>
            {/if}
        {/each}
    </div>

    <div class="flex flex-wrap gap-3">
        <button onclick={()=>showUpload = !showUpload} class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center">
            <i class="fas fa-upload mr-2"></i>
            Upload File
        </button>
        <button onclick={()=>showFolderUpload = !showFolderUpload} class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center">
            <i class="fas fa-folder-plus mr-2"></i>
            Add Folder
        </button>
        <a href={`/dashboard/org/${data.ownedOrg.id}/settings`} class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center">
            <i class="fas fa-gear mr-2"></i>
            Settings
        </a>
        <div class="flex-grow"></div>
        <div class="relative">
            <input type="text" placeholder="Search..." class="w-full md:w-64 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        </div>
    </div>

    {#if showFolderUpload}
        <form use:enhance method="POST" action="?/uploadFolder">
            <input type="text" name="folder-name">
            <input type="hidden" name="org-id" value={data.ownedOrg?.id}>
            <button type="submit">Submit</button>
        </form>
    {/if}

    {#if showUpload}
        <UploadFileForm orgId={data.ownedOrg?.id}/>
    {/if}

    <div class="flex justify-between items-center">
        <div class="text-sm text-gray-400">Showing 4 items</div>
        <div class="flex space-x-4">
            <div class="relative">
                <button class="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center">
                    <span>File Type</span>
                    <i class="fas fa-chevron-down ml-2"></i>
                </button>
            </div>
            <div class="relative">
                <button class="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center">
                    <span>Sort By</span>
                    <i class="fas fa-chevron-down ml-2"></i>
                </button>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-6 border-b border-placeholderText p-2 rounded-md text-xl bg-gray-900">
        <p>Name</p>
        <p>Type</p>
        <p>Uploaded At</p>
        <p>Uploaded By</p>
        <p>Size</p>
        <p>Action</p>
    </div>

    {#each data.folderData as folder (folder.id)}
        <FolderColumn folder={folder} parentFolders={data.parentFolders}/>
    {/each}

    {#each data.fileData as file (file.id)}
        <FileColumn file={file}/>
    {/each}

{/if}
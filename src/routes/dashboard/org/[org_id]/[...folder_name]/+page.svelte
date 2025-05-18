<script lang="ts">
	import UploadFileForm from "$lib/components/org/UploadFileForm.svelte";
    import {page} from "$app/state"
	import { formatSize } from "$lib/helpers.js";
    import { getToastState } from "$lib/components/Toast.svelte.js";
	import UploadFolderForm from "$lib/components/org/UploadFolderForm.svelte";
	import FolderRow from "$lib/components/org/FolderRow.svelte";
	import FileRow from "$lib/components/org/FileRow.svelte";

    let { data, form } = $props();
    let showFileUpload = $state(false);
    let showFolderUpload = $state(false);
    let breadCrumbs = $derived(page.url.pathname.split("/").splice(4));

    const toastState = getToastState()

    $effect(()=>{
        if(form?.error){
            toastState.triggerToast(form.message, "error", 3000)
        }
        if(form?.success){
            toastState.triggerToast(form.message, "success", 2000)
        }
    })
  
</script>

{#if data.error}
    <p>{data.message}</p>
{:else if !data.org || !data.role}
    <p>Org not found</p>
{:else}
    <h2 class="text-5xl text-primary">{data.org.name}</h2>

    <div class="bg-gray-800 rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-2">Storage Used</h2>
        <div class="w-full bg-gray-700 rounded-full h-4">
            <!--calculate a percentage of the storage used-->
            <div class="bg-pink-500 h-2 rounded" style={`width: ${(data.org.storageUsed / (5 * 1024 * 1024 * 1024)) * 100}%`}></div>
        </div>
        <div class="flex justify-between mt-2 text-sm">
            <span>{formatSize(data.org.storageUsed)} used</span>
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

    {#if data.role.toLocaleLowerCase() === "editor" || data.role.toLocaleLowerCase() === "owner"}
        <div class="flex flex-wrap gap-3">
            <button onclick={()=>{showFileUpload = !showFileUpload; showFolderUpload = false}} class="bg-secondary p-2 rounded-md font-semibold">
                <i class="fas fa-upload mr-2"></i>
                Upload File
            </button>
            <button onclick={()=>{showFolderUpload = !showFolderUpload; showFileUpload = false}} class="bg-secondary p-2 rounded-md font-semibold">
                <i class="fas fa-folder-plus mr-2"></i>
                Add Folder
            </button>
            {#if data.role.toLocaleLowerCase() === "owner"}
                <a href={`/dashboard/org/${data.org.id}/settings`} class="bg-secondary p-2 rounded-md font-semibold">
                    <i class="fas fa-gear mr-2"></i>
                    Settings
                </a>
            {/if}
            <div class="flex-grow"></div>
            <div class="relative">
                <input type="text" placeholder="Search..." class="w-full md:w-64 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
        </div>
    {/if}

    {#if showFolderUpload}
        <UploadFolderForm orgId={data.org.id}/>
    {/if}

    {#if showFileUpload}
        <UploadFileForm/>
    {/if}

    <div class="flex justify-end items-center">
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

    {#if data.folderData}
        {#each data.folderData as folder (folder.id)}
            <FolderRow folder={folder} parentFolders={data.parentFolders} canEdit={data.role.toLocaleLowerCase() === "editor" || data.role.toLocaleLowerCase() === "owner"}/>
        {/each}
    {/if}

    {#if data.fileData}
        {#each data.fileData as file (file.id)}
            <FileRow file={file} canEdit={data.role.toLocaleLowerCase() === "editor" || data.role.toLocaleLowerCase() === "owner"}/>
        {/each}
    {/if}
{/if}
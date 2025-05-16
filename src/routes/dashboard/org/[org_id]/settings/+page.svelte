<script lang="ts">
	import { formatSize } from "$lib/helpers";
    import { getToastState } from "$lib/components/Toast.svelte";

    let {data} = $props();
    let enableSaveButton: boolean = $state(false)
    let originalOrgName: string | undefined = $state(data.ownedOrg?.name)
    let orgInputValue: string | undefined = $state(data.ownedOrg?.name)
    const toastState = getToastState()

    function compareOrgName(event: Event) {
        orgInputValue = (event.target as HTMLInputElement).value;
        const hasChanged = originalOrgName !== orgInputValue;
        if(hasChanged) enableSaveButton = true;
        else enableSaveButton = false;
    }

    async function deleteOrg(){

    }

    async function changeOrgName(){
        // disable save changes button to prevent user from calling it again before the server responds
        enableSaveButton = false;
        try{
            const req = await fetch("https://api.fmsatiya.live/change-org-name?org_id="+data.ownedOrg?.id+"&org_name="+orgInputValue,{
                method:"PUT",
                credentials:"include"
            })
            // server returns non 200 for errors
            if(req.status != 200){
                toastState.triggerToast("Error performing operation", "error", 3000)
                return;
            }
            
            toastState.triggerToast("Name Changed Successfully", "success", 2000)
            // update org value to the new value so changes can be read properly
            originalOrgName = orgInputValue
        }
        catch(e){
            toastState.triggerToast("Service cannot be reached. Please try again later.", "error", 3000)
        }
    }
</script>

{#if data.error && data.message}
    <p>{data.message}</p>
{:else if data.ownedOrg}
<div>
    <div class="p-6">
        <h3 class="text-xl mb-4">Organisation Details</h3>
        
        <div class="mb-6">
            <label class="block text-sm font-medium mb-2" for="org-name">Organisation Name</label>
            <input oninput={compareOrgName} type="text" id="org-name" value={orgInputValue} class="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
        </div>
                
        <div class="flex justify-end">
            <button onclick={changeOrgName} disabled={!enableSaveButton} class="bg-secondary p-2 rounded-md font-semibold disabled:bg-gray-600 disabled:opacity-50">Save Changes</button>
        </div>
        
        <div class="mb-6">
            <p class="block text-sm font-medium mb-2">Storage Quota</p>
            <div class="w-full bg-gray-700 rounded h-2 mb-2">
                <div class="bg-pink-500 h-2 rounded" style={`width: ${(data.ownedOrg.storageUsed / (5 * 1024 * 1024 * 1024)) * 100}%`}></div>
            </div>
            <div class="text-sm text-gray-400">{formatSize(data.ownedOrg.storageUsed)} of 5.00 GB total</div>
        </div>
    </div>

    <div class="p-6 mb-4">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl">Organisation Members</h3>
            <button class="btn-primary px-4 py-2 rounded font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Invite Member
            </button>
        </div>
        
        <div class="mb-6">
            <div class="flex mb-2 py-2 border-b border-gray-700">
                <div class="w-1/4 font-medium">Member</div>
                <div class="w-1/4 font-medium">Role</div>
            </div>
            {#if data.members}
                {#each data.members as member}
                    <div class="flex py-3 items-center border-b border-gray-700">
                        <div class="w-1/4 flex items-center">
                            <div class="w-8 h-8 text-sm font-medium">{member.username}</div>
                        </div>
                        <div class="w-1/4">
                            <span class="badge-creator px-3 py-1 rounded-full text-sm">{member.role}</span>
                        </div>
                        <button class="bg-red-600 hover:bg-red-700 text-sm text-white px-3 py-1 rounded">Remove Member</button>
                    </div>
                {/each}
            {/if}
        </div>
    </div>


    <div class="p-6 border border-red-800">
        <h3 class="text-xl mb-4 text-red-400">Danger Zone</h3>
        
        <div class="mb-6">
            <p class="text-gray-400 mb-4">These actions are irreversible. Please proceed with caution.</p>
            
            <div class="flex flex-col gap-4">                
                <div class="flex items-center justify-between p-4 border border-gray-700 rounded">
                    <div>
                        <div class="font-medium">Delete Organisation</div>
                        <div class="text-sm text-gray-400">Permanently delete this organisation and all its data</div>
                    </div>
                    <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete Org</button>
                </div>
            </div>
        </div>
    </div>
</div>

{:else}
    <p>Something went wrong. Please try again later</p>
{/if}
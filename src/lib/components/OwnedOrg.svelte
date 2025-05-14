<script lang="ts">
	import type { organisation } from "$lib/types";
	import InviteMembersDialog from "./InviteMembersDialog.svelte";

    let {org}:{org: organisation} = $props();

    let storageUsed = (org.storageUsed / (1024* 1024 * 1024)).toFixed(2)

    let isOpen = $state(false);
</script>

<InviteMembersDialog bind:isOpen={isOpen} orgId={org.id}/>
<div class="max-w-fit p-2 bg-formBg rounded-xl flex flex-col gap-6 text-xl py-6">
    <div class="flex justify-between items-center">
        <p class="text-2xl font-semibold">{org.name}</p>
        <p class="bg-accent rounded-md text-black font-bold py-2 px-4">Creator</p>
    </div>
    <div class="grid grid-cols-2 px-2">
        <p class="text-placeholderText">Members</p>
        <p class="text-placeholderText">Usage</p>
        <p class="text-primary">8</p>
        <p title={`${org.storageUsed} bytes`} class="text-primary">{storageUsed + "/5GB"}</p>
    </div>
    <div class="flex gap-6 justify-around pt-4">
        <button onclick={()=>isOpen = true} class="bg-secondary p-2 rounded-md font-semibold">Invite Members</button>
        <a href="/dashboard/{org.id}/root" class="bg-primary bg-opacity-10 p-2 rounded-md">View Files</a>
        <button>Settings Icon</button>
    </div>
</div>
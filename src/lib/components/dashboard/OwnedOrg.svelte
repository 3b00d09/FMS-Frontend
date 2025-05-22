<script lang="ts">
	import { formatSize } from "$lib/helpers";
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
        <p class="text-primary">{org.memberCount}</p>
        <p title={formatSize(org.storageUsed)} class="text-primary">{storageUsed + "/5GB"}</p>
    </div>
    <div class="flex gap-6 justify-around items-center pt-4">
        <button onclick={()=>isOpen = true} class="bg-secondary p-2 rounded-md font-semibold">Invite Members</button>
        <a href="/dashboard/org/{org.id}/root" class="bg-primary bg-opacity-10 p-2 rounded-md">View Files</a>
        <a aria-label="Settings" href="/dashboard/org/{org.id}/settings"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="stroke-primary" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></a>
    </div>
</div>
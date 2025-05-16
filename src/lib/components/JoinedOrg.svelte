<script lang="ts">
    import type { joinedOrganisation } from "$lib/types";
    let {joinedOrg}:{joinedOrg:joinedOrganisation} = $props()
</script>
<div class="p-2 bg-formBg rounded-xl flex flex-col gap-6 text-xl py-6">
    <p class="text-2xl font-semibold">{joinedOrg.name}</p>
    <div class="grid grid-cols-2 px-2">
        <p class="text-placeholderText">Created By</p>
        <p class="text-placeholderText">Your Role</p>
        <p class="text-primary">{joinedOrg.creatorName}</p>
        <p class="text-primary">{joinedOrg.role}</p>
    </div>
    <a href={`/dashboard/org/${joinedOrg.id}/root`} class="bg-primary bg-opacity-10 p-2 rounded-md">View Files</a>
</div>
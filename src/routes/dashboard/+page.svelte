<script lang="ts">
    import type { LayoutProps } from './$types';
	import OwnedOrg from '$lib/components/dashboard/OwnedOrg.svelte';
	import JoinedOrg from '$lib/components/dashboard/JoinedOrg.svelte';
	import AddOrgDialog from '$lib/components/dashboard/AddOrgDialog.svelte';
    let { data } = $props();
    let isOpen = $state(false);
</script>

<AddOrgDialog bind:isOpen={isOpen}/>

{#if data.ownedOrg}
    <div class="flex flex-col gap-12">
        <h2 class="text-primary text-4xl font-semibold">My Organisation</h2>
        <OwnedOrg org={data.ownedOrg}/>
    </div>
{:else}
    <button onclick={()=>isOpen=true}>Add Organisation</button>
{/if}

<div class="flex flex-col gap-12">
    <h2 class="text-primary text-4xl font-semibold">Joined Organisations</h2>
    {#if data.joinedOrgs}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:w-3/5">
            {#each data.joinedOrgs as joinedOrg}
                <JoinedOrg {joinedOrg}/>
            {/each}
        </div>
    {/if}
</div>

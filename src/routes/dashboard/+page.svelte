<script lang="ts">
    import type { LayoutProps } from './$types';
	import OwnedOrg from '$lib/components/OwnedOrg.svelte';
	import JoinedOrg from '$lib/components/JoinedOrg.svelte';
	import AddOrgDialog from '$lib/components/AddOrgDialog.svelte';
    let { data }: LayoutProps = $props();
    let isOpen = $state(false);
</script>

<AddOrgDialog bind:isOpen={isOpen} user={data.user?.id} />

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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:w-3/5">
        <JoinedOrg/>
        <JoinedOrg/>
        <JoinedOrg/>
    </div>
</div>

<script lang="ts">
    import type { PageProps } from './$types';
	import OwnedOrg from '$lib/components/OwnedOrg.svelte';
	import JoinedOrg from '$lib/components/JoinedOrg.svelte';
	import AddOrgDialog from '$lib/components/AddOrgDialog.svelte';
    let { data }: PageProps = $props();

    let isOpen = $state(false);
</script>

<AddOrgDialog bind:isOpen={isOpen} user={data.user.id} />

<div class="flex flex-col gap-12">
    <h2 class="text-primary text-4xl font-semibold">My Organisation</h2>
    <OwnedOrg orgId={data.ownedOrg}/>
</div>

<div class="flex flex-col gap-12">
    <h2 class="text-primary text-4xl font-semibold">Joined Organisations</h2>
    <div class="grid grid-cols-2 gap-12 w-3/5">
        <JoinedOrg/>
        <JoinedOrg/>
        <JoinedOrg/>
    </div>
</div>
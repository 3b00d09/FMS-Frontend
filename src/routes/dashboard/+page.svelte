<script lang="ts">
    import type { PageProps } from './$types';
	import OwnedOrg from '$lib/components/OwnedOrg.svelte';
	import JoinedOrg from '$lib/components/JoinedOrg.svelte';
	import AddOrgDialog from '$lib/components/AddOrgDialog.svelte';
    let { data }: PageProps = $props();

    let isOpen = $state(false);
</script>

<AddOrgDialog bind:isOpen={isOpen} user={data.user.id} />
<section class="h-full w-full py-6 px-4">
    <div class="flex justify-between w-full items-start">
        <h2 class="text-primary text-5xl font-playfair">Welcome {data.user.username}</h2>
        <button onclick={()=>isOpen = true} class="bg-secondary text-white rounded-md p-4 flex gap-2 text-xl"><span>+</span>Create Organisation</button>
    </div>

    <div class="mt-16 flex flex-col gap-12">
        <h2 class="text-primary text-4xl font-semibold">My Organisation</h2>
        <OwnedOrg/>
    </div>

    <div class="mt-16 flex flex-col gap-12">
        <h2 class="text-primary text-4xl font-semibold">Joined Organisations</h2>
        <div class="grid grid-cols-2 gap-12 w-3/5">
            <JoinedOrg/>
            <JoinedOrg/>
            <JoinedOrg/>
        </div>
    </div>
</section>
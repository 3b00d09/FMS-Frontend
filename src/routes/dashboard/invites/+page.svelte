<script lang="ts">
	import Invite from '$lib/components/notifications/Invite.svelte';

    let {data} = $props()
</script>

<div class="flex justify-between items-center">
    <h1 class="text-2xl font-semibold">Invites</h1>
</div>

{#if data.invites}
    {#each data.invites as invite}
        <Invite {invite}/>
    {/each}
{:else}
    <p>Nothing to see here</p>
{/if}

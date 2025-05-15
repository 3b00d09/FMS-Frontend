<script lang="ts">
	import Invite from "$lib/components/Invite.svelte";

    let {data}  = $props();
</script>


{#if data.invites}
    {#each data.invites as invite}
        <Invite {invite}/>
    {/each}
{/if}
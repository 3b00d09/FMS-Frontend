<script lang="ts">
	import FolderColumn from "$lib/components/FolderColumn.svelte";
    let { data } = $props();
</script>

<!--TEMPORARY NEGATIVE MARGIN-->
{#each data.rootFolderData as folder (folder.id)}
    <FolderColumn folder={folder} parentFolders={[]}/>
{/each}
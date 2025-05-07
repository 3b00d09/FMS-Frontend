<script lang="ts">
	import FolderColumn from "$lib/components/FolderColumn.svelte";

    import type { PageProps } from "../$types";

    let { data }: PageProps = $props();
</script>

{#each data.rootFolderData as folder (folder.id)}
    <FolderColumn folder={folder} parentFolders={data.parentFolders}/>
{/each}
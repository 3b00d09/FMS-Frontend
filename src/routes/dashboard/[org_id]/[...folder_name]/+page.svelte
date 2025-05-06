<script lang="ts">
	import FolderColumn from "$lib/components/FolderColumn.svelte";

    import type { PageProps } from "../$types";

    let { data }: PageProps = $props();
</script>

<!--TEMPORARY NEGATIVE MARGIN-->
<div class="grid grid-cols-6 px-2 mt-[-2rem] gap-4">
    {#each data.rootFolderData as folder}
        <FolderColumn folder={folder}/>
    {/each}
</div>
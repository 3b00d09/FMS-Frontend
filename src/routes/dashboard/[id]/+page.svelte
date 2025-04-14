<script lang="ts">
	import UploadFileForm from "$lib/components/UploadFileForm.svelte";
    import type { PageProps } from "../$types";

    let { data }: PageProps = $props();
</script>
<h2 class="text-5xl text-primary">{data.ownedOrg.Name}</h2>
<!-- <div>
    <button class="bg-accent text-black p-2 rounded-md">Upload File</button>
</div> -->

<UploadFileForm/>
<div class="grid grid-cols-4 bg-formBg p-2 rounded-md text-xl">
    <p>Name</p>
    <p>Last Modified</p>
    <p>Modified By</p>
    <p>Uploaded By</p>
</div>

<div class="grid grid-cols-4 p-2 gap-4">
    <p>file1</p>
    <p>September 9th 2025</p>
    <p>Anon64942495</p>
    <p>Anon</p>

    <p>file2</p>
    <p>September 9th 2025</p>
    <p>Anon64942495</p>
    <p>Anon</p>

    <p>file3</p>
    <p>September 9th 2025</p>
    <p>Anon64942495</p>
    <p>Anon</p>

    <p>file4</p>
    <p>September 9th 2025</p>
    <p>Anon64942495</p>
    <p>Anon</p>
</div>
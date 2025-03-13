<script lang="ts">
    import { enhance } from '$app/forms';
    let test = $state("");
</script>
<h1 class="">Login</h1>

<form method="POST" use:enhance class="bg-formBg flex flex-col gap-2 h-1/2 justify-center items-center w-1/2">
    <label class="text-white">username</label>
    <input bind:value={test} name="test" type="text">
    <button class="text-white" type="submit">Submit</button>
</form>
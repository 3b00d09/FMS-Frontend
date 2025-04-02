<script lang="ts">
    import { enhance } from '$app/forms';
</script>

<div class="flex items-center justify-center h-full py-6">
    <form method="POST" use:enhance class="bg-formBg rounded-md p-12 h-fit text-black">
        <div class="flex flex-col items-center gap-2">
            <img src="cloud_icon.png" alt="Cloud Icon" class="w-24 h-24">
            <h2 class="text-text text-5xl font-playfair">Create Your Account</h2>
        </div>
        <div class="flex flex-col gap-4 items-start mt-10 w-full">
            <label for="username" class="text-white">Username</label>
            <input name="username" placeholder="Username" type="text" class="w-full bg-background rounded-sm text-white outline-none focus:outline-secondary h-8 p-2">
            <label for="password" class="text-white">Password</label>
            <input name="password" placeholder="******" type="password" class="w-full bg-background rounded-sm text-white outline-none focus:outline-secondary h-8 p-2">
            <label for="repeat-password" class="text-white">Repeat Password</label>
            <input name="repeat-password" placeholder="******" type="password" class="w-full bg-background rounded-sm text-white outline-none focus:outline-secondary h-8 p-2">
            <button class="text-black font-medium w-full bg-primary p-2 rounded-md mt-4 text-lg" type="submit">Register</button>
            <p class="self-center text-white pt-4">Already an existing member? <a href="/login" class="text-accent">Log in</a></p>
        </div>
    </form>
</div>
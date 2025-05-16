<script lang="ts">
    import { enhance } from '$app/forms';
	import { getToastState } from '$lib/components/Toast.svelte';
    import type { PageProps } from './$types';

    let {form}: PageProps = $props();
    // toastState is a global state class that is used to display error or success messages
    const toastState = getToastState();

    // every time the value of form changes, this effect recomputes and checks for error or success
    // with login, success is implied by redirect
    $effect(()=>{
        if(form?.error){
            toastState.triggerToast(form.message, "error", 3000)
        }
    })
    

</script>

<div class="flex items-center justify-center h-full py-6">
    <form method="POST" use:enhance class="bg-formBg rounded-md p-12 h-fit text-black">
        <div class="flex flex-col items-center gap-2">
            <img src="cloud_icon.png" alt="Cloud Icon" class="w-24 h-24">
            <h2 class="text-text text-5xl font-playfair">Welcome Back!</h2>
            <p class="text-placeholderText text-xl">Sign in to your account</p>
        </div>
        <div class="flex flex-col gap-4 items-start mt-10 w-full">
            <label for="username" class="text-white">Username</label>
            <input name="username" placeholder="Username" type="text" class="w-full bg-background rounded-sm text-white outline-none focus:outline-secondary h-8 p-2">
            <label for="password" class="text-white">Password</label>
            <input name="password" placeholder="********" type="password" class="w-full bg-background rounded-sm text-white outline-none focus:outline-secondary h-8 p-2">
            <button class="text-black font-medium w-full bg-primary p-2 rounded-md mt-4 text-lg" type="submit">Log In</button>
            <p class="self-center text-white pt-4">Don't have an account? <a href="/register" class="text-accent">Sign Up!</a></p>
        </div>
    </form>
</div>
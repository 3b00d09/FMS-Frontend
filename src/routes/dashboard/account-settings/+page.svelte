<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { getToastState } from '$lib/components/Toast.svelte.js';
	import type { SubmitFunction } from '@sveltejs/kit';

    let {data, form} = $props()

    let enableSaveButton: boolean = $state(false)
    let enableDeleteButton: boolean = $state(true)
    let enableSavePasswordButton: boolean = $state(false);

    let originalUsername: string | undefined = $state(data.user.username)
    let usernameInputValue: string | undefined = $state(data.user.username)

    let currentPassword: string = $state('');
    let newPassword: string = $state('');
    let confirmNewPassword: string = $state('');

    const toastState = getToastState()

    $effect(()=>{
        if(form?.error){
            toastState.triggerToast(form.message, "error", 1500)
            // this button is always enabled unless the form is processing so it must be re-enabled here if the form fails
            // the other two buttons are enabled conditionally via other methods like validatePasswords and compareUsername
            enableDeleteButton = true
            return;
        }

        if(form?.success){
            toastState.triggerToast(form.message, "success", 1000)
            // force user to logout after username or password reset
            setTimeout(() => {
                goto("/logout")
            }, 1000);
        }
    })

    // ensures the user puts a different username before submitting
    function compareUsername(event: Event) {
        usernameInputValue = (event.target as HTMLInputElement).value.trim();
        const hasChanged = originalUsername !== usernameInputValue;
        if(hasChanged) enableSaveButton = true;
        else enableSaveButton = false;
    }


    // ensure all fields are filled in and the two password fields are equal before enabling the save changes button
    function validatePasswords() {
        if (!currentPassword || newPassword != confirmNewPassword || (newPassword.length === 0 && confirmNewPassword.length === 0)) {
            return;
        }
        enableSavePasswordButton = true;
    }

    // every time one of these three fields change we have to check if we can enable the save button or not
    function onCurrentPasswordInput(e: Event) {
        currentPassword = (e.target as HTMLInputElement).value;
        validatePasswords();
    }
    function onNewPasswordInput(e: Event) {
        newPassword = (e.target as HTMLInputElement).value;
        validatePasswords();
    }
    function onConfirmNewPasswordInput(e: Event) {
        confirmNewPassword = (e.target as HTMLInputElement).value;
        validatePasswords();
    }

    // disable the save button while the form is processing
    const customPasswordEnhance:SubmitFunction = ()=>{
        enableSavePasswordButton = false
        return async ({update}) => {
            await update();
        };
    }

    const customUsernameEnhance:SubmitFunction = ()=>{
        enableSaveButton = false
        return async ({update}) => {
            await update();
        };
    }

    const customDeleteEnhance:SubmitFunction = ()=>{
        enableDeleteButton = false
        return async ({update}) => {
            await update();
        };
    }

    

</script>
<div class="w-1/2">
    <h3 class="text-2xl mb-4">Account Settings</h3>

    <div class="p-6">    
        <form action="/dashboard/account-settings?/changeUsername" method="POST" use:enhance={customUsernameEnhance} class="mb-6">
            <label class="block text-lg font-medium mb-2" for="username">Username</label>
            <input oninput={compareUsername} type="text" name="username" value={usernameInputValue} class="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
        
                        
            <div class="flex justify-end mt-6">
                <button type="submit" disabled={!enableSaveButton} class="bg-secondary p-2 rounded-md font-semibold">Save Changes</button>
            </div>
        </form>

        <form action="/dashboard/account-settings?/changePassword" method="POST" use:enhance={customPasswordEnhance}>
            <div class="mb-6 flex flex-col gap-3">
                <p class="text-lg font-medium mb-2">Change Password</p>
                <label for="current-password">Current Password</label>
                <input oninput={onCurrentPasswordInput} type="password" name="current-password" bind:value={currentPassword} class="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
                <label for="new-password">New Password</label>
                <input oninput={onNewPasswordInput} type="password" name="new-password" bind:value={newPassword} class="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
                <label for="confirm-new-password">Repeat New Password</label>
                <input oninput={onConfirmNewPasswordInput} type="password" name="confirm-new-password" bind:value={confirmNewPassword} class="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
            </div>
            
            <div class="flex justify-end">
                <button type="submit" disabled={!enableSavePasswordButton} class="bg-secondary p-2 rounded-md font-semibold ">Save Changes</button>
            </div>
        </form>
    </div>

    <div class="p-6 border border-red-800">
        <h3 class="text-xl mb-4 text-red-400">Danger Zone</h3>
        
        <div class="mb-6">
            <p class="text-gray-400 mb-4">These actions are irreversible. Please proceed with caution.</p>
            
            <div class="flex flex-col gap-4">                
                <div class="flex items-center justify-between p-4 border border-gray-700 rounded">
                    <div>
                        <div class="font-medium">Delete Account</div>
                        <div class="text-sm text-gray-400">All data uploaded by this account will be deleted including organisation, files, and folders.</div>
                    </div>
                    <form action="/dashboard/account-settings?/deleteAccount" method="POST" use:enhance={customDeleteEnhance}>
                        <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" disabled={!enableDeleteButton}>Delete Account</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
</div>
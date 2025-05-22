<script lang="ts">
	import { formatDate, getNotificationIcon } from "$lib/helpers";
	import type { inviteData } from "$lib/types";
    import { getToastState } from "../Toast.svelte";

    let {invite}: {invite:inviteData} = $props()
    let isSubmitting = $state(false)
    const toastState = getToastState()

    async function acceptInvite(){
        isSubmitting = true
        try{
            const req = await fetch(`https://api.fmsatiya.live/accept-invite?org_id=${invite.orgId}`,{
                credentials:"include",
            })
            if(req.status === 409){
                isSubmitting = false
                toastState.triggerToast("You are only allowed to join 3 organisations", "error", 3000)
                return;
            }
            if (req.status != 202){
                isSubmitting = false;
                toastState.triggerToast("Invitation couldn't be accepted. Please try again later", "error", 3000)
                return;
            }
            toastState.triggerToast("Invitation accepted", "success", 1500)
        }

        catch(e){
            toastState.triggerToast("Service cannot be reached. Please try again later.", "error", 3000)
            isSubmitting = false;
            console.log(e)
        }
    }

    async function declineInvite(){
        isSubmitting = true;
        try{
            const req = await fetch(`https://api.fmsatiya.live/decline-invite?org_id=${invite.orgId}`,{
                credentials:"include",
            })
            if (req.status != 200){
                isSubmitting = false;
                toastState.triggerToast("Invitation couldn't be declined. Please try again later", "error", 3000)
                return
            }
            toastState.triggerToast("Invitation declined", "success", 1500)
        }

        catch(e){
            toastState.triggerToast("Service cannot be reached. Please try again later.", "error", 3000)
            isSubmitting = false;
            console.log(e)
        }
    }
</script>

<div class="flex items-start p-4 rounded-lg transition-colors duration-150 {false ? 'bg-gray-800' : 'bg-gray-800/50 border-l-4 border-purple-600'}">
    <div class="flex-shrink-0 mr-4 p-2 rounded-full {false ? 'bg-gray-700' : 'bg-purple-700/20'} {false ? 'text-gray-400' : 'text-purple-300'}">
        <!--Svelte's @html tag inserts the returned value from the function directly as HTML-->
        {@html getNotificationIcon("invite")}
    </div>
    
    <div class="flex-grow">
        <div class="flex justify-between items-start">
            <span class="font-medium {false ? 'text-gray-300' : 'text-white'}">{`${invite.orgOwner} has invited you to join ${invite.orgName}`}</span>
            <span class="text-xs text-gray-400 ml-4 whitespace-nowrap">{formatDate(invite.invitedAt)}</span>
        </div>

        <div class="mt-3 flex">
            <button disabled={isSubmitting} onclick={acceptInvite} class="bg-secondary  hover:bg-purple-700 text-white text-sm py-1.5 px-4 rounded-lg transition-colors duration-200 mr-2">
                Accept
            </button>
            <button disabled={isSubmitting} onclick={declineInvite} class="bg-secondary  hover:bg-gray-600 text-white text-sm py-1.5 px-4 rounded-lg transition-colors duration-200">
                Decline
            </button>
        </div>
    </div>
</div>
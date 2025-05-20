<script lang="ts">
	import { redirect } from "@sveltejs/kit";
    import { getToastState } from "../Toast.svelte";
    let {username, isLastRow, orgId} = $props()
    let isInviting = $state(false)
    const toastState = getToastState()

    async function inviteUser(){
        isInviting = true;
        try{
            const req = await fetch(`https://api.fmsatiya.live/invite-user?username=${username}&org-id=${orgId}`,{
            credentials:"include"
            })

            if(req.status === 200){
                isInviting = false;
                toastState.triggerToast("User invited successfully", "success", 2000)
                return;
            }
            // redirect to login if the server wasn't able to authenticate the user
            else if(req.status === 401){
                isInviting = false;
                return redirect(301, "/login")
            }
            // if the server was not able to read the necessary data for the invite to work
            else if (req.status === 422){
                isInviting = false;
                toastState.triggerToast("Missing data for invite. Please refresh and try again", "error", 3000)
                return;
            }
            // other unexpected errors
            else{
                isInviting = false;
                toastState.triggerToast("Unable to invite user", "error", 2000)
                return;
            }
        }

        // api was not responsive
        catch(e){
            toastState.triggerToast("Service cannot be reached. Please try again later", "error", 4000)
            isInviting = false;
        }   
    }
</script>
<div class="flex justify-between items-center w-full p-4" class:border-b={isLastRow} class:border-[#2d3748]={isLastRow}>
    <p class="text-gray-300">{username}</p>
    <button disabled={isInviting} onclick={inviteUser} class="bg-secondary rounded-md py-1 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 ">
        Invite
    </button>
</div>
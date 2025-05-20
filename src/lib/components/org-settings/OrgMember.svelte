<script lang="ts">
	import type { organisationMember } from "$lib/types";
	import { isRedirect, redirect } from "@sveltejs/kit";
    import { getToastState } from "../Toast.svelte";

    let {member}:{member:organisationMember} = $props()
    // perserve the original role so if role change operation fails we can revert the select value
    let role = $state(member.role)
    let isRemoving = $state(false)
    let isChangingRole = $state(false)

    const toastState = getToastState()

    async function changeRole(){
        isChangingRole = true
        try{
            const req = await fetch(`https://api.fmsatiya.live/update-member-role?username=${member.username}&role=${role}`,{
                credentials: "include",
                method: "PUT"
            })
            if (req.status === 200){
                toastState.triggerToast("Role changed successfully", "success", 1000)
                member.role = role
            }
            else if (req.status === 401){
                return redirect(301, "https://fmsatiya.live/login")
            }
            else if(req.status === 500){
                role = member.role
                const res = await req.json()
                toastState.triggerToast(res.error, "error", 3000)
            }
            else{
                role = member.role
                toastState.triggerToast("Something went wrong. Please refresh the page and try again", "error", 3000)
            }
        }
        catch(e){
            role = member.role
            if(isRedirect(e)){
                throw e
            }
            toastState.triggerToast("Unable to reach service. Please try again later", "error", 3000)
        }

        isChangingRole = false
    }

    async function removeMember(){
        isRemoving = true
        try{
            const req = await fetch(`https://api.fmsatiya.live/remove-member?username=${member.username}`,{
                credentials: "include",
                method: "DELETE"
            })
            if (req.status === 200){
                toastState.triggerToast("Member removed succesfully", "success", 1000)
                member.role = role
            }
            else if (req.status === 401){
                return redirect(301, "https://fmsatiya.live/login")
            }

            else if(req.status === 500){
                const res = await req.json()
                toastState.triggerToast(res.error, "error", 3000)
                isRemoving = false
            }
            else{
                toastState.triggerToast("Something went wrong. Please refresh the page and try again", "error", 3000)
                isRemoving = false
            }
        }
        catch(e){
            if(isRedirect(e)){
                throw e
            }
            toastState.triggerToast("Unable to reach service. Please try again later", "error", 3000)
            isRemoving = false
        }

    }
</script>



<div class="grid grid-cols-4 gap-2 py-3 items-center border-b border-gray-700">
    <p class="text-sm font-medium">{member.username}</p>
    <select onchange={changeRole} disabled={isChangingRole} class="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1 text-sm w-1/2" bind:value={role}>
        <option value="Editor">Editor</option>
        <option value="Viewer">Viewer</option>
    </select>
    <p class="text-sm">{member.joinedAt}</p>
    <button disabled={isRemoving} onclick={removeMember} class="w-1/3 bg-red-600 hover:bg-red-700 text-sm text-white px-3 py-1 rounded">Remove</button>
</div>
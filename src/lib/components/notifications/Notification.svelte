<script lang="ts">
	import { formatDate, getNotificationIcon } from "$lib/helpers";
	import type { notificationData } from "$lib/types";
    import { getToastState } from "../Toast.svelte";

    // the hasReadAll is binded to the parent component
    // when the user clicks mark all as red and the operation is a success, the parent component will update has read all to be true
    // since the variable is bindable, it will update here too so the UI can be updated
    let {notification, hasReadAll=$bindable()}: {notification:notificationData, hasReadAll:boolean} = $props()
    const toastState = getToastState()

    // cant mutate the state of notification so a different variable is used
    let isRead = $state(notification.isRead)
    let isMarking = $state(false)

    async function markAsRead(){
        isMarking = true
        try{
            const req = await fetch(`https://api.fmsatiya.live/read-notification?id=${notification.id}`,{
                credentials: "include"
            })
            if(req.status === 200){
                isRead = true
            }
            else{
                toastState.triggerToast("Unable to mark as read. Please try again later", "error", 4000)
            }
            isMarking = false;
        }
        catch(e){
            isMarking = false
            toastState.triggerToast("Unable to reach service. Please try again later", "error", 3000)
        }
    }
</script>


<div class="flex flex-col gap-4 p-4 rounded-lg transition-colors duration-150 {isRead || hasReadAll ? 'bg-gray-800' : 'bg-gray-800/50 border-l-4 border-purple-600'}">
    <div class="flex items-start">
        <div class="flex-shrink-0 mr-4 p-2 rounded-full {isRead || hasReadAll? 'bg-gray-700' : 'bg-purple-700/20'} {isRead ? 'text-gray-400' : 'text-purple-300'}">
            {@html getNotificationIcon(notification.notifType)}
            
        </div>
        <!-- the format of invite-related notifications is slightly different-->
        {#if notification.notifType.toLocaleLowerCase() === "invite" || notification.notifType.toLowerCase() === "join org" || notification.notifType.toLocaleLowerCase() === "decline invite"}
            <div class="flex-grow">
                <div class="flex justify-between items-center">
                    <span class="font-medium {isRead|| hasReadAll ? 'text-gray-300' : 'text-white'}">{notification.payloadName + " " + notification.message + " " + notification.orgName}</span>
                    <span class="text-xs text-gray-400 ml-4 whitespace-nowrap">{formatDate(notification.createdAt)}</span>
                </div>
            </div>
        {:else}
            <div class="flex-grow">
                <div class="flex justify-between items-center">
                    <span class="font-medium {isRead|| hasReadAll ? 'text-gray-300' : 'text-white'}">{notification.actorName + " " + notification.message + " " + notification.orgName}</span>
                    <span class="text-xs text-gray-400 ml-4 whitespace-nowrap">{formatDate(notification.createdAt)}</span>
                </div>
                <div class="text-xs text-gray-400 mt-2">{notification.payloadName}</div>
            </div>
        {/if}
    </div>
    {#if !isRead && !hasReadAll}
        <button disabled={isMarking} class="self-start" onclick={markAsRead}>Mark as Read</button>
    {/if}
</div>

<script lang="ts">
    import Notification from "$lib/components/notifications/Notification.svelte";
    import { getToastState } from "$lib/components/Toast.svelte.js";
	import { isRedirect, redirect } from "@sveltejs/kit";

    let {data} = $props()
    let showUnread = $state(true)
    let showAll = $state(false)
    let isMarking = $state(false)
    let hasReadAll = $state(false);
    const toastState = getToastState()

    async function markAllAsRead(){
        isMarking = true
        try{
            const req = await fetch("https://api.fmsatiya.live/read-notification?all=true",{
                credentials: "include"
            })
            if(req.status === 200){
                isMarking = false;
                hasReadAll = true;
                toastState.triggerToast("Marked all as read", "success", 1000)

            }
            else if(req.status === 422){
                toastState.triggerToast("Missing required data. Please refresh the page and try again", "error", 5000)
            }

            else if(req.status === 401){
                return redirect(301, "/login")
            }
            else{
                toastState.triggerToast("An unknown error occured. Please try again later", "error", 5000)
            }
        }

        catch(e){
            if(isRedirect(e)){
                throw e
            }
            toastState.triggerToast("Service could not be reached. please try again later", "error", 3000)
        }
    }
</script>

<div class="flex justify-between items-center">
    <h1 class="text-2xl font-semibold">Notifications</h1>
    
    <button onclick={markAllAsRead} class="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
        Mark all as read
    </button>
</div>

<div class="flex border-b border-gray-700">

    <button onclick={()=>{showUnread = true; showAll = false;}}
        class="px-4 py-2 mr-4 font-medium text-sm transition-colors duration-200 relative" class:opacity-100={showUnread} class:opacity-50={!showUnread}>
        Unread
        <div class="absolute bottom-0 left-0 w-full h-0.5" class:block={showUnread} class:bg-purple-500={showUnread}></div>
    </button>

    <button 
        onclick={()=>{showUnread = false; showAll = true;}}
        class="px-4 py-2 mr-4 font-medium text-sm transition-colors duration-200 relative" class:opacity-100={showAll} class:opacity-50={!showAll}>
        All
        <div class="absolute bottom-0 left-0 w-full h-0.5" class:block={showAll} class:bg-purple-500={showAll}></div>
    </button>
</div>

<div class="space-y-4">

{#if data.notifications}
    {#if showAll}
        {#each data.notifications as notification (notification.id)}
            <Notification {notification} {hasReadAll} />
        {/each}

        {:else if showUnread}
            {#if data.notifications.filter(n=>!n.isRead).length === 0}
                <p class="text-xl font-semibold">You are up to date.</p>
            {:else}
                {#each data.notifications.filter(n=>!n.isRead) as notification (notification.id)}
                <Notification {notification} {hasReadAll}/>
                {/each}
            {/if}
    {/if}
{:else}
    <p>Nothing to see here</p>
{/if}

</div>


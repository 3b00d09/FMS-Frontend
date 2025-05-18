<script lang="ts">
	import InviteMemberRow from "./InviteMemberRow.svelte";


  let {isOpen = $bindable(), orgId} = $props();
  let inputValue = $state("");
  let users:string[] = $state([]);
  
  function closeDialog(e?: MouseEvent) {
    // to stop the input div from picking up the onclick 
    if(e?.currentTarget === e?.target){
        isOpen = false;
        users = []
        inputValue = ""
    }
  }

  async function searchUsers(){
    if(inputValue.trim().length === 0) return
    try{
        const req = await fetch(`https://api.fmsatiya.live/users?username=${inputValue}`,{
            credentials:"include"
        })
        const res = await req.json()
        if(res.users) users = res.users
        else users = []
    }
    catch(e){
        console.log(e)
    }
  }




</script>

<!--Look into shadcn svelte for a dialog component-->
<dialog open={isOpen} class="fixed inset-0 p-0 m-0 w-full h-full overflow-hidden bg-black/50 backdrop-blur-sm">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onclick={closeDialog} class="flex items-center justify-center h-full w-full">
        <div class="bg-[#111827] rounded-lg shadow-lg w-full max-w-md text-gray-200 overflow-hidden">
            <div class="p-4">
                <input 
                    type="text" 
                    bind:value={inputValue} 
                    class="w-full bg-[#1f2937] border border-[#374151] rounded-md text-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Search users..."
                    oninput={searchUsers}
                />
            </div>
            
            {#if users.length > 0}
                <div class="max-h-60 overflow-y-auto">
                    {#each users as user, i}
                        <InviteMemberRow username={user} isLastRow={i < users.length - 1} {orgId}/>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</dialog>
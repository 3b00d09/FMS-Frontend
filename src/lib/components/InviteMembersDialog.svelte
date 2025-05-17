<script lang="ts">

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
    console.log(inputValue.trim())
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


  async function inviteUser(username: string){
    try{
        const req = await fetch(`https://api.fmsatiya.live/invite-user?username=${username}`,{
        credentials:"include"
        })

        console.log(req.status)
        const res = await req.json()
        console.log(res)
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
    <!--try moving the form to another component and make the container a button-->
    <div onclick={closeDialog} class="flex items-center justify-center h-full w-full">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
            <input 
                type="text" 
                bind:value={inputValue} 
                class="w-full p-3 border border-gray-300 rounded-md place-self-start" 
                placeholder="Search users..."
                oninput={searchUsers}
            />

            {#if users.length > 0}
                {#each users as user, i}
                    <div class="flex justify-between items-center w-full py-2" class:border-b={i < users.length -1}>
                        <p>{user}</p>
                        <button data-username={user} class="bg-accent rounded-md p-2" onclick={()=>inviteUser(user)}>Invite</button>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</dialog>
<script lang="ts">
  let {isOpen = $bindable(), user} = $props();
  let inputValue = $state("");
  
  function closeDialog(e?: MouseEvent) {
    // to stop the input div from picking up the onclick 
    if(e?.currentTarget === e?.target){
        isOpen = false;
    }
  }
  
  async function handleSubmit() {
    if(inputValue === "")return;

    const data = {
        Name: inputValue,
        Creator_id: user
    }

    const req = await fetch("/api/add-org",{
        method:"Post",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
    })
    const res = await req.json()
    console.log(res)
  }

</script>

<!--Look into shadcn svelte for a dialog component-->
<dialog open={isOpen} class="w-full h-full p-0 m-0 bg-black/50 backdrop-blur-sm">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!--try moving the form to another component and make the container a button-->
    <div onclick={closeDialog} class="flex items-center justify-center h-full w-full">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <input 
            type="text" 
            bind:value={inputValue} 
            class="w-full p-3 border border-gray-300 rounded-md" 
            placeholder="Type here..."
        />
        <div class="mt-4 flex justify-end">
            <button onclick={closeDialog} class="mr-2 px-4 py-2 border rounded-md">Cancel</button>
            <button onclick={handleSubmit} class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
        </div>
        </div>
    </div>
</dialog>
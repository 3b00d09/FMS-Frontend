<script lang="ts">
    import { getToastState } from "./Toast.svelte";
    let {isOpen = $bindable(), user} = $props();
    let inputValue = $state("");
    const toastState = getToastState()
    
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
        }

        const req = await fetch("https://api.fmsatiya.live/add-org",{
            method:"Post",
            credentials:"include",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        })
        if(req.status != 200){
            const res = await req.json()
            toastState.triggerToast(res.error, "error", 3000)
        }
        else{
            toastState.triggerToast("Org Created Successfully", "success", 2000)
            // wait for the toast to go away before reloading the page to get the new data + close dialog
            // since this is not a form with use:enhance, the data isn't automatically refreshed so a page reload is required
            setTimeout(() => {
                isOpen = false;
                window.location.reload()
            }, 2000);
        }
  }

</script>

<!--Look into shadcn svelte for a dialog component-->
<dialog open={isOpen} class="fixed inset-0 p-0 m-0 w-full h-full overflow-hidden bg-black/50 backdrop-blur-sm">
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
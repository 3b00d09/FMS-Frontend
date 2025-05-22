<script lang="ts">
    import { getToastState } from "../Toast.svelte";
    let {isOpen = $bindable()} = $props();
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
            Name: inputValue.trim(),
        }
        
        if(data.Name.length < 3 || data.Name.length > 12){
            toastState.triggerToast("Organisation name must be between 3 and 12 characters", "error", 3000)
            return
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

<dialog open={isOpen} class="fixed inset-0 p-0 m-0 w-full h-full overflow-hidden bg-black/50 backdrop-blur-sm">
    <div onclick={closeDialog} role="button" tabindex={0} aria-label="Close Dialog" onkeydown={()=>closeDialog} class="flex items-center justify-center h-full w-full">
        <div class="bg-[#111827] p-4 rounded-lg shadow-lg w-full max-w-md text-gray-200 overflow-hidden">
        <input 
            type="text" 
            bind:value={inputValue} 
            class="w-full bg-[#1f2937] border border-[#374151] rounded-md text-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
            placeholder="Type here..."
        />
        <div class="mt-4 flex justify-end">
            <button onclick={closeDialog} class="mr-2 px-4 py-2 border rounded-md">Cancel</button>
            <button onclick={handleSubmit} class="bg-secondary rounded-md py-1 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500">Submit</button>
        </div>
        </div>
    </div>
</dialog>

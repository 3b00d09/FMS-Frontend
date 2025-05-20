<script lang="ts">
    let {title, content}:{title: string, content: string} = $props();

    function getSvgIcon(){
        const _title = title.toLowerCase()
        switch(_title){
            case "team organisation":
                return `<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"> <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>`
            case "access control":
                return `<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg>`
            case "lightweight storage":
                return`<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-1.243-.243A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd"></path></svg>`
        }
    }
</script>

<div class="bg-background p-6 rounded-lg">
    <div class="text-blue-400 mb-4">
        {@html getSvgIcon()}
    </div>
    <h3 class="text-xl font-semibold mb-2 text-accent">{title}</h3>
    <p class="text-2xl">{content}</p>
</div>


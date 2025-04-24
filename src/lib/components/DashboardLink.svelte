<script lang="ts">
    import { page } from '$app/state';
    let {icon, text, link}:{icon: string, text: string, link: string} = $props();

    let active = $derived(page.url.pathname.slice(1, page.url.pathname.length).toLocaleLowerCase() == text.toLocaleLowerCase())

</script>

<a href={link} class="flex items-center gap-4 hover:bg-primary hover:bg-opacity-10 py-6 px-4" class:bg-black={active} class:bg-opacity-40={active}>
    <img src="/cloud_icon.png" alt="icon" class="w-12 h-12">
    <p class="text-xl text-primary">{text}</p>
</a>
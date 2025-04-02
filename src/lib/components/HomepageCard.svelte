<script lang="ts">
    let {title, iconLink, content} = $props();
</script>

<div class="bg-background p-4 rounded-md w-1/3">
    <img src={iconLink} class="w-16" alt="icon">
    <p class="text-center text-3xl text-accent font-semibold">{title}</p>
    <p class="text-2xl">{content}</p>
</div>
<script lang="ts">
    import HomepageCard from "$lib/components/HomepageCard.svelte";
    import type { PageProps } from './$types';

	let { data }: PageProps = $props();

</script>
<nav class="container mx-auto px-6 py-4 flex justify-between items-center">
    <div class="flex items-center gap-2">
        <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.666 3.727 1.6a1 1 0 00.788 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v2.8a1 1 0 00.53.88l4 2a1 1 0 00.94 0l4-2a1 1 0 00.53-.88v-2.8l1.69-.723a1 1 0 00.53-.88V6.41c0-.379-.214-.725-.53-.884L10.66 2.7a1 1 0 00-.94 0L3.31 5.526A1 1 0 002.5 6.41v2.107a1 1 0 00.81.884z"></path>
        </svg>
        <p class="text-2xl font-semibold font-sans text-white">FMS</p>
    </div>
    <div class="space-x-4">
        <a href="/user-guide">User Guide</a>
        {#if data.user}
            <a href="/dashboard"><button class="bg-secondary text-xl rounded-md py-2 px-6">Dashboard</button></a>
        {:else}
            <a href="/login"><button class="bg-secondary text-xl rounded-md py-2 px-6">Login</button></a>
        {/if}
    </div>
</nav>

<section class="container mx-auto px-6 py-16 text-center">
    <h1 class="text-5xl font-playfair mb-6">Secure Cloud Storage <span class="text-accent">for Your Team</span></h1>
    <p class="text-xl mb-10 max-w-2xl mx-auto">Securely store, share, and collaborate on files with intuitive team management.</p>
</section>

<section class="bg-formBg py-16">
    <div class="container mx-auto px-6">
        <h2 class="text-primary text-center text-4xl mb-12">Features</h2>
        <div class="grid md:grid-cols-3 gap-8">
            <HomepageCard title="Team Organisation" content="Create organizations and invite team members. Manage your workspace with simple controls."/>
            <HomepageCard title="Access Control" content="Set permissions for files and folders. Keep your data secure with role-based access."/>
            <HomepageCard title="Lightweight Storage" content="Practical file storage solution for your personal and team files."/>
        </div>
    </div>
</section>
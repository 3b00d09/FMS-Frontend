<script lang="ts">
    import HomepageCard from "$lib/components/HomepageCard.svelte";
    import type { PageProps } from './$types';

	let { data }: PageProps = $props();

</script>
<header class="flex justify-around py-4 items-center">
    <div class="flex gap-4">
        <p class="text-4xl font-sans text-primary">FMS</p>
        <!-- image from https://freeicons.io/business-and-online-icons/cloud-icon-icon-2  -->
        <img alt="icon of a cloud" class="w-12 h-12" src="cloud_icon.png"/>
    </div>
    <div class="flex gap-8 items-center">
        <a class="text-2xl" href="/">Features</a>
        {#if data.user}
            <a href="/dashboard"><button class="bg-secondary text-xl rounded-md py-2 px-6">Dashboard</button></a>
        {:else}
            <a href="/login"><button class="bg-secondary text-xl rounded-md py-2 px-6">Login</button></a>
        {/if}
    </div>
</header>

<section class="flex flex-col items-center justify-center gap-6 mt-12">
    <h1 class="text-6xl font-playfair">Secure Cloud Storage <span class="text-accent">for Your Team</span></h1>
    <p class="text-3xl w-1/3 text-wrap text-center">Securely store, share, and collaborate on files with intuitive team management.</p>
    <button class="bg-secondary text-3xl rounded-md py-4 px-6">Get Started</button>
</section>

<section class="bg-formBg flex flex-col mt-12 py-12">
    <h2 class="text-primary text-center text-6xl px-6">Features</h2>
    <div class="flex gap-4 justify-between items-center p-6">
        <HomepageCard title="Team Organisation" iconLink="cloud_icon.png" content="Create organizations and invite team members seamlessly. Manage your workspace with intuitive controls."/>
        <HomepageCard title="Access Control" iconLink="cloud_icon.png" content="Fine-grained permission settings for files and folders. Keep your data secure with role-based access."/>
        <HomepageCard title="Secure Storage" iconLink="cloud_icon.png" content="Enterprise-grade encryption and security measures to protect your sensitive data."/>
    </div>
</section>
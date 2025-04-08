<script>
	import DashboardLink from "$lib/components/DashboardLink.svelte";
    let {children} = $props();
</script>
<main class="flex h-full w-full">
    <section class="bg-formBg w-1/5 ">
        <div class="flex justify-between items-center py-6 px-4">
            <h2 class="text-primary text-5xl font-playfair">FMS</h2>
            <a href="/">Home</a>
        </div>

        <div class="flex flex-col gap-2 mt-12">
            <DashboardLink text="Dashboard" link="/dashboard" icon="" />
            <DashboardLink text="Notifications" link="/dashboard" icon="" />
            <DashboardLink text="Account Settings" link="/dashboard" icon="" />
        </div>
    </section>
    <section class="flex-1">{@render children()}</section>
</main>
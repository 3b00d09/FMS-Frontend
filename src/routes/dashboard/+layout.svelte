<script>
	import DashboardLink from "$lib/components/DashboardLink.svelte";
    let {children} = $props();
</script>
<main class="flex h-screen w-screen">
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
    <section class="flex-1 py-6 px-4">
        <div class="flex justify-between w-full items-start">
            <h2 class="text-primary text-5xl font-playfair">Welcome {"data.user.username"}</h2>
            <!-- <button onclick={()=>isOpen = true} class="bg-secondary text-white rounded-md p-4 flex gap-2 text-xl"><span>+</span>Create Organisation</button> -->
        </div>
        <section class="flex flex-col gap-16 mt-16">
            {@render children()}
        </section>

    </section>
</main>
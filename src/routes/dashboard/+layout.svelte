<script>
	import DashboardLink from "$lib/components/dashboard/DashboardLink.svelte";
    let {children} = $props();
</script>

<div class="flex h-screen w-full overflow-hidden">
    <section class="bg-formBg w-1/5 h-screen flex flex-col">
        <div class="flex justify-between items-center py-6 px-4">
            <h2 class="text-primary text-5xl font-playfair">FMS</h2>
            <a class="text-primary text-lg font-playfair" href="/">
                <i class="fas fa-home"></i>
                Home
            </a>
        </div>
    
        <div class="flex flex-col flex-grow">
            <div class="flex flex-col gap-2 mt-12">
                <DashboardLink text="Dashboard" link="/dashboard" icon="" />
                <DashboardLink text="Notifications" link="/dashboard/notifications" icon="" />
                <DashboardLink text="Invites" link="/dashboard/invites" icon=""/>
                <DashboardLink text="Account Settings" link="/dashboard" icon="" />
            </div>
            
            <div class="mt-auto mb-8">
                <DashboardLink text="Logout" link="/logout" icon=""/>
            </div>
        </div>
    </section>
    
    <section class="flex-1 py-6 px-4 overflow-y-auto h-screen">
        <div class="flex justify-between w-full items-start">
            <h2 class="text-primary text-5xl font-playfair">Welcome {'data.user.username'}</h2>
            <!-- <button onclick={()=>isOpen = true} class="bg-secondary text-white rounded-md p-4 flex gap-2 text-xl"><span>+</span>Create Organisation</button> -->
        </div>
        <section class="flex flex-col gap-12 mt-16">
            {@render children()}
        </section>
    </section>
</div>

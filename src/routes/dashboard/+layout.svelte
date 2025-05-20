<!-- Dashboard.svelte -->
<script>
    import DashboardLink from "$lib/components/dashboard/DashboardLink.svelte";
    import { page } from "$app/state";
    let { children, data } = $props();
    
    // used to enable/disable sidebar for mobile
    let sidebarOpen = $state(false);
    
    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }
    
</script>

<div class="flex h-screen w-full overflow-hidden ">
    <button 
        class="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-formBg text-primary"
        onclick={toggleSidebar}
        onkeydown={toggleSidebar}
        aria-label="Close sidebar menu"
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
    </button>

    <section 
        class="bg-formBg lg:w-1/5 h-screen flex flex-col fixed lg:static z-10 transition-all duration-300 ease-in-out transform"
        class:translate-x-0={sidebarOpen}
        class:w-64={sidebarOpen}
        class:-translate-x-full={!sidebarOpen}
        class:lg:translate-x-0={true}
    >
        <div class="flex justify-between items-center py-6 px-4 mt-12 lg:mt-0">
            <h2 class="text-primary text-5xl font-playfair">FMS</h2>
            <a class="text-primary text-lg font-playfair" href="/">
                <i class="fas fa-home"></i>
                Home
            </a>
        </div>
    
        <div class="flex flex-col flex-grow">
            <div class="flex flex-col gap-2 mt-12">
                <DashboardLink text="Dashboard" link="/dashboard"/>
                <DashboardLink text="Notifications" link="/dashboard/notifications"/>
                <DashboardLink text="Invites" link="/dashboard/invites"/>
                <DashboardLink text="Account Settings" link="/dashboard/account-settings"/>
            </div>
            
            <div class="mt-auto mb-8">
                <DashboardLink text="Logout" link="/logout"/>
            </div>
        </div>
    </section>
    
    <!-- acts as a backdrop -->
    {#if sidebarOpen}
        <button 
            class="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
            onclick={toggleSidebar}
            onkeydown={toggleSidebar}
            aria-label="Close sidebar menu"
        ></button>
    {/if}

    <section class="flex-1 py-6 px-4 overflow-y-auto h-screen lg:ml-0 w-full mt-6 lg:mt-0" class:ml-0={!sidebarOpen} class:ml-64={sidebarOpen && window.innerWidth < 1024}>
        <div class="flex justify-between w-full items-start mt-8 lg:mt-0">
            <h2 class="text-primary text-5xl font-playfair">Welcome {data.user.username}</h2>
        </div>
        <section class="flex flex-col gap-12 mt-16">
            {@render children()}
        </section>
    </section>
</div>
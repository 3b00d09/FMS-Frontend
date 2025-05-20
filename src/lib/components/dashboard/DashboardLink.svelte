<script lang="ts">
    import { page } from '$app/state';
    let {text, link}:{text: string, link: string} = $props();

    let active = $derived(page.url.pathname.slice(1, page.url.pathname.length).toLocaleLowerCase() == text.toLocaleLowerCase())

    const getSvg = () => {
        switch(text.toLocaleLowerCase()){
            case "dashboard":
                return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" width="24" height="24" class="stroke-primary">
                    <path d="M20,65 Q20,40 45,40 Q45,20 70,20 Q95,20 95,45 Q120,45 120,70 Q120,90 100,90 L40,90 Q20,90 20,65 Z" fill="none" stroke-width="5" />
                    <path d="M45,45 L85,45 L85,75 L45,75 Z" class="fill-primary" />
                    <path d="M55,55 L75,55 L75,65 L55,65 Z" fill="#091433" />
                </svg>`;
            case "notifications":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="stroke-primary" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>`;
            case "invites":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="stroke-primary" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
            case "account settings":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="stroke-primary" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
            case "logout":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="stroke-primary" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/></svg>`;
            default:
                return "";
        }
    }

</script>

<!--Sveltekit pre-fetches data when a user hovers over a link by running the +page.server.ts load function-->
<!--this breaks logout completely because it will log the user out and delete the cookie by just hovering the link-->
<a data-sveltekit-preload-data={text.toLocaleLowerCase()=== "logout" ? "off" : ""} href={link} class="flex items-center gap-4 hover:bg-primary hover:bg-opacity-10 py-6 px-4" class:bg-black={active} class:bg-opacity-40={active}>
    {@html getSvg()}
    <p class="text-xl text-primary">{text}</p>
</a>
import { isRedirect, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies, fetch }) => {
		const data = await request.formData();

		const username = data.get('username') as string;
		const password = data.get('password') as string;

		if(password.length === 0 || username.length === 0){
			return{
				error: true,
				message: "Mandatory fields required."
			}
		}
		
		try{
			const req = await fetch('https://api.fmsatiya.live/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});

			const res = await req.json();
			if(res.error){
				return{
					error: true,
					message: res.error as string
				}
			}
			cookies.set("session_token", res.session.ID, {
				path:"/",
				expires:new Date(res.session.ExpiresAt * 1000),
				sameSite: "lax",
				httpOnly: true,
				domain:"fmsatiya.live"
			})
			return redirect(308, "/dashboard")
			
		}
		catch(e){
			// sveltekit THROWS redirects so i have to check if the error caught is a redirect or not 
			// if its a redirect error that means we need to throw again so it works :D
			if (isRedirect(e)){
				throw e
			}
			return{
				error: true,
				message: "Service Could not be reached. Please try again later."
			}
		}

	}
};

import { isRedirect, redirect, type Actions } from '@sveltejs/kit';

export const load = async({locals})=>{
	// if a user object already exists, login should redirect to the homepage
	if(locals.user){
		return redirect(301, "/")
	}
}


export const actions: Actions = {
	default: async ({ request, cookies, fetch }) => {
		// read in form data
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		// basic field validation check
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


			// 401 is HTTP code for unauthorised which is returned when the user makes a request to the login endpoint with missing username / password
			if (req.status === 401){
				return{
					error: true,
					message: "Missing form data."
				}
			}

			const res = await req.json();
			// if the form has the data it needs but the login function failed because credentials don't match
			if(res.error){
				return{
					error: true,
					message: res.error
				}
			}

			// at this point there are no errors so the session cookie is set
			cookies.set("session_token", res.session.ID, {
				path:"/",
				expires:new Date(res.session.ExpiresAt * 1000),
				sameSite: "lax",
				httpOnly: true,
				domain:"fmsatiya.live",
			})
			return redirect(301, "/dashboard")
			
		}
		catch(e){
			// sveltekit THROWS redirects, have to check if the error caught is a redirect or not 
			// if its a redirect error that means it needs to be thrown again so it works
			if (isRedirect(e)){
				throw e
			}
			// else there was a problem reaching the api.
			console.log(e)
			return{
				error: true,
				message: "Service Could not be reached. Please try again later."
			}
		}

	}
};

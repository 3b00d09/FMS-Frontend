import { redirect, type Actions } from '@sveltejs/kit';

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
				body: JSON.stringify({ username,  })
			});

			const res = await req.json();
			if(req.status === 202){
				cookies.set("session_token", res.session.ID, {
					path:"/",
					expires:new Date(res.session.ExpiresAt * 1000),
					sameSite: "lax",
					httpOnly: true,
				})
				return redirect(300, "/dashboard")
			}

			else{
				console.log("didnt work")
				console.log(req.status)
				console.log(res)
			}
		}
		catch(e){
			return{
				error: true,
				message: "idk"
			}
		}

	}
};

export const actions = {
	default: async ({ fetch, cookies, setHeaders }) => {
        console.log("called")
		const response = await fetch('http://localhost:3000/cookie-test', {
			credentials: 'include'
		});

		const data = await response.json();

        const setCookieHeader = response.headers.get("set-cookie");
        if (setCookieHeader) {
            
        }
            
        return {
                success: true,
                message: data.message
            };
	}
};
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// proxy so i can share cookies with the go server
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
				configure:(proxy)=>{
					proxy.on('error',(err)=>{
						console.log("error connecting: " + err)
					})
				}
			}
		}
	}
});

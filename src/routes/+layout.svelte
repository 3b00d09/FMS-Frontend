<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="h-screen w-screen bg-background flex flex-col justify-center items-center">
	{@render children()}
</main>


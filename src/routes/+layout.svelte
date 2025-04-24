<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="min-h-screen w-full bg-background text-text overflow-x-hidden">
	{@render children()}
</main>


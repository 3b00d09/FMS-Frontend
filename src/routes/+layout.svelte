<script lang="ts">
	import '../app.css';
	import { getToastState, setToastState } from '$lib/components/Toast.svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	
	setToastState();
	const toastState = getToastState();

	let { children } = $props();
</script>

<main class="min-h-screen w-full bg-background text-text overflow-x-hidden">
	{#if toastState.isActive}
		<div class="fixed top-4 right-4 z-50">
			<p 
				class="text-white text-xl p-4 rounded-md shadow-lg"
				class:bg-green-600={toastState.status === 'success'}
				class:bg-red-600={toastState.status === 'error'}
				transition:fly={{ x: 300, duration: 500, easing: quintOut }}
			>
				{toastState.message}
			</p>
		</div>
	{/if}
	{@render children()}
</main>


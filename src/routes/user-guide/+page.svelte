<div class="overflow-hidden">
	<nav class="fixed left-0 right-0 top-0 z-20 bg-[#0f1427]">
		<div class="container mx-auto flex items-center justify-between px-6 py-4">
			<div class="flex items-center gap-2">
				<svg class="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
					<path
						d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000
                        1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1
                        1 0 11.788 1.838l-2.727 1.666 3.727 1.6a1 1 0
                        00.788 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5
                        10.12v2.8a1 1 0 00.53.88l4 2a1 1 0 00.94 0l4-2a1
                        1 0 00.53-.88v-2.8l1.69-.723a1 1 0 00.53-.88V6.41c0
                        -.379-.214-.725-.53-.884L10.66 2.7a1 1 0 00-.94
                        0L3.31 5.526A1 1 0 002.5 6.41v2.107a1 1 0
                        00.81.884z"
					/>
				</svg>
				<p class="font-sans text-2xl font-semibold text-white">FMS</p>
			</div>
			<div class="space-x-4">
				<a href="/"><button class="rounded-md bg-secondary px-6 py-2 text-xl">Home</button></a>
			</div>
		</div>
	</nav>

	<div class="flex h-screen pt-16">
		<aside class="fixed bottom-0 left-0 top-16 hidden w-72 overflow-y-auto bg-[#0f1427] p-4 md:block">
			<h2 class="mb-6 text-xl font-bold text-purple-300">Contents</h2>
			<nav>
				<ul class="space-y-4">
					<li>
						<a href="#introduction" class="block transition hover:text-purple-300">Introduction</a>
					</li>
					<li>
						<a href="#getting-started" class="block transition hover:text-purple-300">Getting Started</a>
					</li>
					<li>
						<a href="#team-organization" class="block transition hover:text-purple-300">Team Organization</a>
					</li>
					<li>
						<a href="#access-control" class="block transition hover:text-purple-300">Access Control</a>
					</li>
					<li>
						<a href="#file-storage" class="block transition hover:text-purple-300">File Storage</a>
					</li>
					<li>
						<a href="#troubleshooting" class="block transition hover:text-purple-300">Troubleshooting</a>
					</li>
				</ul>
			</nav>
		</aside>

		<main class="h-full flex-1 overflow-auto p-8 md:ml-72">
            <!--this nav only shows on smaller screens to replace the side nav above-->
			<nav class="mb-6 flex flex-row space-x-4 overflow-x-auto border-b border-gray-700 pb-2 text-purple-300 md:hidden">
				<a href="#introduction" class="whitespace-nowrap hover:text-purple-100"> Introduction </a>
				<a href="#getting-started" class="whitespace-nowrap hover:text-purple-100">Getting Started</a>
				<a href="#team-organization" class="whitespace-nowrap hover:text-purple-100">Team Organization</a>
				<a href="#access-control" class="whitespace-nowrap hover:text-purple-100">Access Control</a>
				<a href="#file-storage" class="whitespace-nowrap hover:text-purple-100"> File Storage </a>
				<a href="#troubleshooting" class="whitespace-nowrap hover:text-purple-100">Troubleshooting</a>
			</nav>
			<h1 class="mb-6 text-4xl font-bold">User Guide</h1>

			<section id="introduction" class="mb-12">
				<h2 class="mb-4 text-2xl font-bold text-purple-300">Introduction</h2>
				<p class="mb-4">
					Welcome to FMS - your secure cloud storage solution for team collaboration.
				</p>
				<p>This guide will help you understand how to use our platform effectively and securely.</p>
			</section>

			<section id="getting-started" class="mb-12">
				<h2 class="mb-4 text-2xl font-bold text-purple-300">Getting Started</h2>
				<div class="rounded-lg bg-[#121730] p-6">
					<h3 class="mb-3 text-xl font-semibold">Creating Your Account</h3>
					<p class="mb-4">Instructions here.</p>

					<h3 class="mb-3 text-xl font-semibold">First Login</h3>
					<p>When you login, you are redirected to your dashboard where you can see the following:
                        <li>Created Organisation</li>
                        <li>Joined Organisation(s)</li>
                        <li>Invites from other organisations</li>
                        <li>Notifications about the activity of any organisation you are a member of</li>
                        <li>Account Settings</li>
                        <li>Logout button</li>
                    </p>
				</div>
			</section>

			<section id="team-organization" class="mb-12">
				<h2 class="mb-4 text-2xl font-bold text-purple-300">Team Organization</h2>
				<div class="mb-6 flex items-start">
					<div class="mr-4 text-blue-300">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
					</div>
					<div>
						<h3 class="mb-2 text-xl font-semibold">Creating Organizations</h3>
						<p>Learn how to create and manage organizations for your team.</p>
					</div>
				</div>

				<div class="flex items-start">
					<div class="mr-4 text-blue-300">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
							/>
						</svg>
					</div>
					<div>
						<h3 class="mb-2 text-xl font-semibold">Inviting Team Members</h3>
						<p>Instructions for inviting and managing team members.</p>
					</div>
				</div>
			</section>

			<section id="access-control" class="mb-12">
				<h2 class="mb-4 text-2xl font-bold text-purple-300">Access Control</h2>
				<p>Content for access control section...</p>
			</section>

			<section id="file-storage" class="mb-12">
				<h2 class="mb-4 text-2xl font-bold text-purple-300">File Storage</h2>
				<p>Content for file storage section...</p>
			</section>
		</main>
	</div>
</div>

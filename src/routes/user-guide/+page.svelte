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
					<li><a href="#introduction" class="block transition hover:text-purple-300">Introduction</a></li>
					<li><a href="#getting-started" class="block transition hover:text-purple-300">Getting Started</a>
					</li>
					<li><a href="#team-organization" class="block transition hover:text-purple-300">Team Organization</a>
					</li>
					<li><a href="#access-control" class="block transition hover:text-purple-300">Access Control</a>
					</li>
					<li><a href="#file-storage" class="block transition hover:text-purple-300">File Storage</a></li>
					<li><a href="#support" class="block transition hover:text-purple-300">Troubleshooting</a>
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
				<a href="#support" class="whitespace-nowrap hover:text-purple-100">Troubleshooting</a>
			</nav>
			<h1 class="mb-8 text-4xl font-bold">User Guide</h1>

			<section id="introduction" class="mb-12">
				<h2 class="mb-6 text-2xl font-bold text-purple-300">Introduction</h2>
				<div class="space-y-4">
					<p>Welcome to FMS - your secure cloud storage solution for team collaboration.</p>
					<p>This guide will help you understand how to use our platform effectively.</p>
				</div>
			</section>

			<section id="getting-started" class="mb-12">
				<h2 class="mb-6 text-2xl font-bold text-purple-300">Getting Started</h2>
				<div class="space-y-4 rounded-lg bg-[#121730] p-6">
					<h3 class="text-xl font-semibold">Creating Your Account</h3>
					<p>
						When creating an account, the only requirement is that username and password must each
						be between 6 and 12 characters inclusive.
					</p>

					<h3 class="mt-6 text-xl font-semibold">First Login</h3>
					<p>
						When you login, you are redirected to your dashboard where you can see the following:
					</p>
					<div class="mt-4 space-y-2 px-6">
						<li>Created Organisation</li>
						<li>Joined Organisation(s)</li>
						<li>Invites from other organisations</li>
						<li>Notifications about the activity of any organisation you are a member of</li>
						<li>Account Settings</li>
						<li>Logout button</li>
					</div>
				</div>
			</section>

			<section id="team-organization" class="mb-12">
				<h2 class="mb-6 text-2xl font-bold text-purple-300">Organisations</h2>
				<p>
					Organisations are the heart of FMS. An organisation is where members can upload, delete,
					and download files and folders.
				</p>
				<div class="mt-6 space-y-4 rounded-lg bg-[#121730] p-6">
					<h3 class="text-xl font-semibold">Create Your Organisation</h3>
					<div class="my-4 rounded-r border-l-4 border-red-600 bg-red-900/30 p-4 text-white">
						<p class="font-medium">Users are only allowed to create one organisation.</p>
					</div>
					<p>As an organisation owner, you are able to do the following:</p>
					<div class="mt-4 space-y-2 px-6">
						<li>Invite or remove members to and from your organisation</li>
						<li>Change the role of a member of your organisation</li>
						<li>Change the name of your organisation</li>
						<li>Delete the organisation</li>
					</div>
					<p class="mt-4">These permissions are exclusive to organisation owners only</p>
					<h3 class="mt-6 text-xl font-semibold">Join an organisation</h3>
					<p>
						Joining an organisation is only possible if the owner of an organisation invites you.
					</p>
					<p class="mt-4">
						In the invites page, you can see all invites you recieved from organisation owners.
					</p>
					<div class="my-4 rounded-r border-l-4 border-red-600 bg-red-900/30 p-4 text-white">
						<p class="font-medium">Users are only allowed to join up to three organisations.</p>
					</div>
				</div>
			</section>

			<section id="access-control" class="mb-12">
				<h2 class="mb-6 text-2xl font-bold text-purple-300">Access Control</h2>
				<p>
					FMS allows creators of organisations to manage the roles of members and what permissions
					they have within the organisation
				</p>
				<div class="mt-6 space-y-4 rounded-lg bg-[#121730] p-6">
					<p>There are two roles to assign each organisation member:</p>
					<div class="mt-4 px-6">
						<li>Editor</li>
						<div class="mt-2 space-y-2 px-6">
							<li>Upload files and folders</li>
							<li>Delete files and folders</li>
							<li>Download files</li>
						</div>
						<li class="mt-4">Viewer</li>
						<div class="mt-2 space-y-2 px-6">
							<li>Download files</li>
						</div>
					</div>
					<div class="my-4 rounded-r border-l-4 border-red-600 bg-red-900/30 p-4 text-white">
						<p class="font-medium">Every new member is assigned the "Editor" role by default.</p>
					</div>
					<h3 class="mt-6 text-xl font-semibold">Changing the role of members</h3>
					<p>
						To change the role of a member, head to your dashboard and click on the settings icon in
						"Your Organisation"
					</p>
					<p class="mt-4">
						You will be presented with a list of members where you can change the role of each of
						them
					</p>
					<h3 class="mt-6 text-xl font-semibold">View your role at an organisation</h3>
					<p>
						Your role at an organisation can be viewed in the dashboard under the "Joined
						Organisations" section
					</p>
				</div>
			</section>

			<section id="file-storage" class="mb-12">
				<h2 class="mb-6 text-2xl font-bold text-purple-300">File Storage</h2>
				<p>
					FMS has a set of rules with regards to folders being created and files being uploaded to
					an organisation
				</p>
				<div class="mt-6 space-y-4 rounded-lg bg-[#121730] p-6">
					<h3 class="text-xl font-semibold">Folders</h3>
					<p>The following rules must be followed when creating a folder:</p>
					<div class="mt-4 space-y-2 px-6">
						<li>
							Folder names must be unique within a folder. For example, when you create a folder
							called "foo" inside a folder called "bar", you cannot create another folder called
							"foo" at that level
						</li>
						<li>
							Folder names must not be the same as the parent folder. For example, folder "foo"
							cannot contain a child folder also named "foo"
						</li>
						<li>Folder name "root" is not allowed at any level</li>
						<li>Folder names must be between 3 and 13 characters</li>
						<li>Folder names can only contain alphanumerical characters and spaces</li>
					</div>
					<h3 class="mt-6 text-xl font-semibold">Files</h3>
					<p>The following rules must be followed when uploading a file:</p>
					<div class="mt-4 space-y-2 px-6">
						<li>
							File names must be unique within a folder. For example, when you upload a file called
							"foo" inside a folder called "bar", you cannot upload another file called "foo" at
							that level
						</li>
						<li>Maximum file size is 10mb.</li>
						<li>The following are supported file types:</li>
						<div class="mt-2 space-y-2 px-6">
							<li>PDF</li>
							<li>DOC</li>
							<li>DOCX</li>
							<li>JPG</li>
							<li>PNG</li>
						</div>
						<li class="mt-4">
							File name cannot contain special characters: (&lt;&gt;:&quot;/\|?*)
						</li>
					</div>
					<div class="my-4 rounded-r border-l-4 border-red-600 bg-red-900/30 p-4 text-white">
						<p class="font-medium">
							Organisations have a maximum storage space of 5 GB. Hover over the usage number in the
							dashboard to know exactly how much storage you are using
						</p>
					</div>
				</div>
			</section>

			<section id="support" class="mb-12">
				<h2 class="mb-6 text-2xl font-bold text-purple-300">Contact Support</h2>
				<p>
					For any further questions or help troubleshooting problems, reach out at
					bd315977@gmail.com
				</p>
			</section>
		</main>
	</div>
</div>

<!--prevent the internal links from jumping around the page and scroll smoothly instead-->
<style>
	*{
		scroll-behavior: smooth;
	}
</style>
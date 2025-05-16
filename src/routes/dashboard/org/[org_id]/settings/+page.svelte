<div>
    <div class="p-6">
        <h3 class="text-xl mb-4">Organisation Details</h3>
        
        <div class="mb-6">
            <label class="block text-sm font-medium mb-2" for="org-name">Organisation Name</label>
            <input type="text" id="org-name" value="Lorem Org" class="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
        </div>
        
        <div class="mb-6">
            <p class="block text-sm font-medium mb-2">Storage Quota</p>
            <div class="w-full bg-gray-700 rounded h-2 mb-2">
                <div class="bg-pink-500 h-2 rounded" style="width: 15%"></div>
            </div>
            <div class="text-sm text-gray-400">0.15 GB used of 1.00 GB total</div>
        </div>
        
        <div class="flex justify-end">
            <button class="btn-primary px-4 py-2 rounded font-medium">Save Changes</button>
        </div>
    </div>

    <div class="p-6 mb-4">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl">Organisation Members</h3>
            <button class="btn-primary px-4 py-2 rounded font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Invite Member
            </button>
        </div>
        
        <div class="mb-6">
            <div class="flex mb-2 py-2 border-b border-gray-700">
                <div class="w-1/4 font-medium">Member</div>
                <div class="w-1/4 font-medium">Role</div>
            </div>
            
            <div class="flex py-3 items-center border-b border-gray-700">
                <div class="w-1/4 flex items-center">
                    <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-3 text-sm font-medium">JD</div>
                    <span>Jane Doe</span>
                </div>
                <div class="w-1/4">
                    <span class="badge-creator px-3 py-1 rounded-full text-sm">Creator</span>
                </div>
            </div>
            
            <div class="flex py-3 items-center border-b border-gray-700">
                <div class="w-1/4 flex items-center">
                    <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-3 text-sm font-medium">JS</div>
                    <span>John Smith</span>
                </div>
                <div class="w-1/4">
                    <select class="bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-400">
                        <option value="editor" selected>Editor</option>
                        <option value="viewer">Viewer</option>
                    </select>
                </div>
            </div>
            
            <div class="flex py-3 items-center border-b border-gray-700">
                <div class="w-1/4 flex items-center">
                    <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-3 text-sm font-medium">AB</div>
                    <span>Alice Brown</span>
                </div>
                <div class="w-1/4">
                    <select class="bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-400">
                        <option value="editor">Editor</option>
                        <option value="viewer" selected>Viewer</option>
                    </select>
                </div>
            </div>
        </div>
    </div>


    <div class="p-6 border border-red-800">
        <h3 class="text-xl mb-4 text-red-400">Danger Zone</h3>
        
        <div class="mb-6">
            <p class="text-gray-400 mb-4">These actions are irreversible. Please proceed with caution.</p>
            
            <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between p-4 border border-gray-700 rounded">
                    <div>
                        <div class="font-medium">Transfer Ownership</div>
                        <div class="text-sm text-gray-400">Transfer this organisation to another user</div>
                    </div>
                    <button class="btn-secondary px-3 py-1 rounded">Transfer</button>
                </div>
                
                <div class="flex items-center justify-between p-4 border border-gray-700 rounded">
                    <div>
                        <div class="font-medium">Delete Organisation</div>
                        <div class="text-sm text-gray-400">Permanently delete this organisation and all its data</div>
                    </div>
                    <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete Org</button>
                </div>
            </div>
        </div>
    </div>
</div>
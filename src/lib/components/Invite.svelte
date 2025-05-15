<script lang="ts">
	import type { inviteData } from "$lib/types";

    let {invite}: {invite:inviteData} = $props()

    async function acceptInvite(){
        try{
            const req = await fetch(`https://api.fmsatiya.live/accept-invite?org_id=${invite.orgId}`,{
                credentials:"include",
            })
            if (req.status != 202){
                const res = await req.json()
                console.log(res)
            }
        }

        catch(e){
            console.log(e)
        }
    }


    async function declineInvite(){
        try{
            const req = await fetch(`https://api.fmsatiya.live/decline-invite?org_id=${invite.orgId}`,{
                credentials:"include",
            })
            if (req.status != 202){
                const res = await req.json()
                console.log(res)
            }
        }

        catch(e){
            console.log(e)
        }
    }
</script>

<p>
    {`${invite.orgOwner} has invited you to join ${invite.orgName}`}
    {`invited at: ${invite.invitedAt}`}
    <button onclick={acceptInvite}>Accept</button>
    <button onclick={declineInvite}>Decline</button>
</p>
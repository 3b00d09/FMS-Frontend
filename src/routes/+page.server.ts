export const load = async({fetch})=>{ 
    const req2 = await fetch('/api/auth', {
        method: 'GET',
        credentials: 'include'
    });

    const res2 = await req2.json();
    console.log(res2);
}
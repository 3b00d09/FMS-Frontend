import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load:LayoutServerLoad = ({locals})=>{
    if(!locals.user){
        return redirect(301, "/login")
    }

    return{
        user: locals.user
    }
}
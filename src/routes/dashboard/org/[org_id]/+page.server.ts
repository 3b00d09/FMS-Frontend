import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load:PageServerLoad = async () => {
    return redirect(301, `/dashboard/`)
};

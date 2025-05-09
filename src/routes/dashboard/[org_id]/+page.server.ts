import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { folderData } from "$lib/types";

export const load:PageServerLoad = async () => {
    return redirect(301, "/root")
};

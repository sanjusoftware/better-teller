import type { PageLoad } from './$types';
import Activities from "$lib/data/activities.json"

export const load: PageLoad = () => {
    return {
        Activities: Activities
    }
};
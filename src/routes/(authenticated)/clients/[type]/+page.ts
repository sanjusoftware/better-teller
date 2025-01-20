import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    return {
        clienttype: params.type.toLocaleUpperCase()
    }
};

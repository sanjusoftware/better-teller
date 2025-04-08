import type { PageLoad } from './$types';
import Products from '$lib/data/products.json';

export const load: PageLoad = ({ params }) => {
    return { 
        productCateory: params.type, 
        products: (params.type as string) === 'all' ? Products : Products.filter((product) => product.productCategory === params.type)
    }
};
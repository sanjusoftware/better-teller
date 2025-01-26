import type { PageLoad } from './$types';
import Products from '../../../data/products.json';

export const load: PageLoad = ({ params }) => {
    return { 
        productCateory: params.type, 
        products: Products.filter((product) => product.productCategory === params.type)
    }
};
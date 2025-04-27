export const clientPath = (client: any) => {
    return "/clients/" + client.type + "/" + client.cif; 
}


export const currentClientProductsPath = (client: any, product?: string) => {
    let path = "/clients/" + client.type + "/" + client.cif + "/products";
    if (product) {
        path += "?open=" + product;
    }
    return path;
}
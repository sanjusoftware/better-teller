export const clientPath = (client: any) => {
    return "/clients/" + client.type + "/" + client.cif; 
}

export const clientProductSummaryPath = (client: any, product?: string) => {
    let path = "/clients/" + client.type + "/" + client.cif + "/products";
    if (product) {
        path += "?open=" + product;
    }
    return path;
}

export const accountTransactionsPath = (client: any, account: any) => {
    return "/clients/" + client.type + "/" + client.cif + "/products/casa/" + account.iban;
}
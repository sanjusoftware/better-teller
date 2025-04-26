import { LocalStorage } from "./localstorage.svelte";

export const nextTicket = new LocalStorage("nextTicket", '');
export const servingTicket = new LocalStorage("servingTicket", '');
export const currentClient = new LocalStorage("currentClient", {});
export const pastClients = new LocalStorage("pastClients", []);

export const currentClientPath = (service?: string) => {
    let path = "/clients/" + currentClient.current.type + "/" + currentClient.current.cif;
    if (service) {
        path += "?open=" + service;
    }
    return path;
}

export const isCurrentClient = () => {
    return Object.keys(currentClient.current).length > 2;
}

export const isServingClient = () => {
    return servingTicket.current != ''
}

export const completeService = () => {
    console.log("Completing service for client", currentClient.current.cif);
    updatePastClients();
    resetContext();
}

const updatePastClients = () => {
    if (pastClients.current.length == 0) {
        pastClients.current = JSON.stringify([currentClient.current.cif.toString()]);
        return;
    }

    // the wiered logic below of first stringifying and then parsing is to avoid the error of 
    // "Unexpected non-whitespace character after JSON at position 8 (line 1 column 9)"
    let pastclientsList = JSON.parse(JSON.stringify(pastClients.current));    
    pastclientsList.push(currentClient.current.cif.toString());
    pastClients.current = pastclientsList;
}

const resetContext = () => {
    nextTicket.current = '';
    servingTicket.current = '';
    currentClient.current = {};
}
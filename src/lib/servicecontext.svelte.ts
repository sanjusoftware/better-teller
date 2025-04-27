import { LocalStorage } from "./localstorage.svelte";

export const nextTicket = new LocalStorage("nextTicket", '');
export const servingTicket = new LocalStorage("servingTicket", '');
export const currentClient = new LocalStorage("currentClient", {});
export const pastClients = new LocalStorage("pastClients", []);

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
        pastClients.current = [currentClient.current];
        return;
    }

    let pastclientsList = pastClients.current;
    if (pastclientsList.length >= 20) {
        // Remove the oldest client if we have more than 20 clients to not overload localstorage
        // and to keep the list manageable
        pastclientsList.shift();
    }
    pastclientsList.unshift(currentClient.current);
    pastClients.current = pastclientsList;
}

const resetContext = () => {
    nextTicket.current = '';
    servingTicket.current = '';
    currentClient.current = {};
}
import { LocalStorage } from "./storage.svelte";

export const nextTicket = new LocalStorage("nextTicket", '');
export const servingTicket = new LocalStorage("servingTicket", '');
export const currentClient = new LocalStorage("currentClient", {});
export const pastClients = new LocalStorage("pastClients", []);

export const currentClientPath = () => {
    return "/clients/" + currentClient.current.type + "/" + currentClient.current.cif;
}

export const isCurrentClient = () => {
    return Object.keys(currentClient.current).length > 2;
}
import { LocalStorage } from "./storage.svelte";

export const nextTicket = new LocalStorage("nextTicket", '');
export const servingTicket = new LocalStorage("servingTicket", '');
export const currentClient = new LocalStorage("currentClient", {});
export const pastClients = new LocalStorage("pastClients", []);

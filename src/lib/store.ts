import { writable } from "svelte/store";

export const ticket = writable<string | null>(null);
export const servingTicket = writable<string | null>(null);
export const currentClient = writable<any | null>(null);
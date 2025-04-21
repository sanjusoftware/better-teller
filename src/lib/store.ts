import { writable } from "svelte/store";

export const ticket = writable<string | null>(null);
export const currentClientID = writable<string | null>(null);

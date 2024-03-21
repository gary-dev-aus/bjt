import { writable, type Writable } from "svelte/store";

export type Log = {
  event: "gameEvent" | "bet" | "cardDraw";
  data: object;
};

export const historyStore: Writable<object[]> = writable([]);

export function addLog(log: object) {
  historyStore.update((history) => [...history, log]);
}

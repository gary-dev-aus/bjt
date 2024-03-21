import { get, writable, type Writable } from "svelte/store";
import { Card } from "./card";
import { RANKS, SUITS } from "./gameConfig";
import { addLog, type Log } from "./history";

export class Deck {
  private _cards: Writable<Card[]> = writable([]);
  get cards(): Card[] {
    return get(this._cards);
  }

  constructor(deckNum: number) {
    const cards: Card[] = [];
    const suits = SUITS;
    const ranks = RANKS;

    for (let i = 0; i < deckNum; i++) {
      suits.forEach((suit) => {
        ranks.forEach((rank) => {
          cards.push(new Card(suit, rank));
        });
      });
    }

    const log: Log = {
      event: "gameEvent",
      data: {
        desc: `New deck initialised with ${deckNum} decks.`,
      },
    };
    addLog(log);
    this._cards.set(cards);
  }
}

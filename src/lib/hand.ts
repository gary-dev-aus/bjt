import { get, writable, type Writable } from "svelte/store";
import type { Card } from "./card";

export class Hand {
  private _cards: Writable<Card[]> = writable([]);
  get cards(): Card[] {
    return get(this._cards);
  }
  set cards(cards: Card[]) {
    this._cards.set(cards);
  }

  addCard(card: Card) {
    this.cards = [...this.cards, card];
  }
  removeCard(card: Card) {
    this.cards = this.cards.filter((c) => c !== card);
  }
}

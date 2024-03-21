import { get, writable, type Writable } from "svelte/store";
import { Card } from "./card";
import { RANKS, SUITS } from "./gameConfig";
import { addLog, type Log } from "./history";

abstract class CardPile {
  private _cards: Writable<Card[]> = writable([]);
  get cards(): Card[] {
    return get(this._cards);
  }
  set cards(cards: Card[]) {
    this._cards.set(cards);
  }
}

export class Deck extends CardPile {
  constructor(deckNum: number) {
    super();
    const newCards: Card[] = [];
    const suits = SUITS;
    const ranks = RANKS;

    for (let i = 0; i < deckNum; i++) {
      suits.forEach((suit) => {
        ranks.forEach((rank) => {
          newCards.push(new Card(suit, rank));
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
    this.cards = newCards;
  }

  drawCard(): Card | Error {
    const deck = this.cards;
    const card = deck.shift();
    this.cards = deck;

    const log: Log = {
      event: "cardDraw",
      data: {
        card,
        deck: this.cards,
      },
    };
    addLog(log);

    return card || new Error("No more cards in deck");
  }
}

export class DiscardPile extends CardPile {}

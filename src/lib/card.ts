import { get, writable } from "svelte/store";

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "j" | "q" | "k" | "a";

export class Card {
  private _suit: Suit;
  get suit(): Suit {
    return this._suit;
  }
  private _rank: Rank;
  get rank(): Rank {
    return this._rank;
  }

  private _isRevealed = writable(false);
  get isRevealed() {
    return get(this._isRevealed);
  }
  set isRevealed(isRevealed: boolean) {
    this._isRevealed.set(isRevealed);
  }
  toggleReveal() {
    this._isRevealed.update((isRevealed) => !isRevealed);
  }

  constructor(suit: Suit, rank: Rank) {
    this._suit = suit;
    this._rank = rank;
  }

  getShortName(): [string, string] {
    let suit: string = this.suit;
    switch (suit) {
      case "hearts":
        suit = "♥";
        break;
      case "diamonds":
        suit = "♦";
        break;
      case "clubs":
        suit = "♣";
        break;
      case "spades":
        suit = "♠";
        break;
    }

    return [this._rank.toString(), this._suit[0].toUpperCase()];
  }

  getLongName(): string {
    let rank: string = this.rank.toString();
    switch (rank) {
      case "a":
        rank = "Ace";
        break;
      case "2":
        rank = "Two";
        break;
      case "3":
        rank = "Three";
        break;
      case "4":
        rank = "Four";
        break;
      case "5":
        rank = "Five";
        break;
      case "6":
        rank = "Six";
        break;
      case "7":
        rank = "Seven";
        break;
      case "8":
        rank = "Eight";
        break;
      case "9":
        rank = "Nine";
        break;
      case "10":
        rank = "Ten";
        break;
      case "j":
        rank = "Jack";
        break;
      case "q":
        rank = "Queen";
        break;
      case "k":
        rank = "King";
        break;
    }
    return `${rank} of ${this.suit}`;
  }
}

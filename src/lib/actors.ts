import { get, writable } from "svelte/store";
import { Hand } from "./hand";
import { Bet } from "./bet";
import type { Card } from "./card";
import { addLog, type Log } from "./history";

abstract class Actor {
  private _name: string;
  get name(): string {
    return this._name;
  }

  public hand = new Hand();

  private _isActive = writable(false);
  get isActive() {
    return get(this._isActive);
  }
  set isActive(isActive: boolean) {
    this._isActive.set(isActive);
  }
  toggleActive() {
    this._isActive.update((isActive) => !isActive);
  }

  constructor(name: string) {
    this._name = name;
  }

  drawCard(card: Card) {
    this.hand.addCard(card);
    const log: Log = {
      event: "cardDraw",
      data: {
        card,
      },
    };
    addLog(log);
  }
}

export class Player extends Actor {
  public bet = Bet;
}

export class Dealer extends Actor {
  constructor() {
    super("dealer");
  }
}

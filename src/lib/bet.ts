import { get, writable, type Writable } from "svelte/store";
import { addLog, type Log } from "./history";

export class Bet {
  private _amount = writable(0);
  get amount() {
    return get(this._amount);
  }
  set amount(amount: number) {
    this._amount.set(amount);
  }

  public multiplier = 1;

  private _history: Writable<number[]> = writable([]);
  get history(): number[] {
    return get(this._history);
  }

  addBet(amount: number) {
    this._history.update((history) => [...history, amount]);
    this.amount = amount;

    const log: Log = {
      event: "bet",
      data: {
        amount: this.amount,
      },
    };
    addLog(log);
  }
}

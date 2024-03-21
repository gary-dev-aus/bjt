import { Dealer, Player } from "./actors";
import { Deck } from "./cardpile";
import { addLog, type Log } from "./history";

export class Game {
  private _actors: [...Player[], Dealer];
  get actors(): [...Player[], Dealer] {
    return this._actors;
  }

  public deck: Deck;

  constructor(playerNum: number = 1, deckNum: number = 1) {
    const players = [];
    for (let i = 0; i < playerNum; i++) {
      players.push(new Player(`player${i + 1}`));
    }
    const dealer = new Dealer();

    const log: Log = {
      event: "gameEvent",
      data: {
        desc: "New game initialised.",
      },
    };
    addLog(log);

    this._actors = [...players, dealer];
    this.deck = new Deck(deckNum);
  }
}

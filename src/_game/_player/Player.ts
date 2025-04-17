import { Card } from '../_card/Card';

export default class Player {
  private cards: Array<Card> = [];

  public getCards():  Array<Card> {
    return this.cards;
  }
  public addCard(card: Card) {
    this.cards.push(card);
  }
  public reset() {
    this.cards = [];
  }
}

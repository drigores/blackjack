import { Card } from '../_card/Card';

export default class Deck {
  private suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
  private values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  private deck: Array<Card>;

  constructor() {
    this.deck = this.createDeck();
  }

  private createDeck = (): Card[] => {
    const tempDeck = [];
    for (let i = 0; i < this.values.length; i++) {
      for (let x = 0; x < this.suits.length; x++) {
        const card = { Value: this.values[i], Suit: this.suits[x] };
        tempDeck.push(card);
      }
    }
    return tempDeck;
  };

  public shuffle = () => {
    const shuffledDeck = [...this.deck];
    for (let i = 0; i < 1000; i++) {
      const location1 = Math.floor(Math.random() * shuffledDeck.length);
      const location2 = Math.floor(Math.random() * shuffledDeck.length);
      const tmp = shuffledDeck[location1];

      shuffledDeck[location1] = shuffledDeck[location2];
      shuffledDeck[location2] = tmp;
    }
    this.deck = shuffledDeck;
  };

  public pop = (): Card => {
    const card = this.deck.pop();
    if (card) return card;
    else throw new Error('No Cards Left');
  };

  public reset = () => {
    this.deck = this.createDeck();
  };
}

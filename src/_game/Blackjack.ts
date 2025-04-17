import { Card } from './_card/Card';
import Deck from './_deck/Deck';
import Player from './_player/Player';

/*
Based on that Rules for BlackJack: https://www.youtube.com/watch?v=eyoh-Ku9TCI
*/
export default class Blackjack {
  private faceCards = ['J', 'K', 'Q'];
  private aceCard = 'A';
  private player = new Player();
  private dealer = new Player();
  private deck = new Deck();
  private ended = false;
  private inProgress = false;

  private calculateValue(cards: Card[]): number {
    let value = 0;
    let aces = 0;
    cards.forEach((card) => {
      if (this.faceCards.includes(card.Value)) value += 10;
      else if (card.Value == this.aceCard) {
        aces += 1;
      } else value += parseInt(card.Value);
    });
    if (aces == 1) {
      if (value < 11) value += 11;
      else value += 1;
    } else if (aces > 1) value += aces;
    return value;
  }

  private startGame() {
    this.deck.shuffle();
    this.player.addCard(this.deck.pop());
    this.player.addCard(this.deck.pop());
    this.dealer.addCard(this.deck.pop());
  }
  public hit() {
    if (!this.isBust() && !this.isBlackJack()) this.player.addCard(this.deck.pop());
    if (this.isEnded()) this.setInProgress(false);
  }
  public stand() {
    if (!this.isBust() && !this.isBlackJack())
      while (this.isDealerAbleToDraw()) {
        this.dealer.addCard(this.deck.pop());
      }
    this.setEnded(true);
    this.setInProgress(false);
  }
  public getPlayerHand(): Card[] {
    return this.player.getCards();
  }
  public getPlayerHandValue(): number {
    return this.calculateValue(this.player.getCards());
  }
  public getDealerHandValue(): number {
    return this.calculateValue(this.dealer.getCards());
  }

  public getDealerHand(): Card[] {
    return this.dealer.getCards();
  }

  public reset() {
    this.player.reset();
    this.dealer.reset();
    this.deck.reset();
    this.ended = false;
    this.inProgress = true;
    this.startGame();
  }

  public isBust() {
    return (
      this.calculateValue(this.player.getCards()) > 21 ||
      this.calculateValue(this.dealer.getCards()) > 21
    );
  }

  public isEnded(): boolean {
    return this.ended || this.isBust() || this.isBlackJack();
  }

  private setEnded(ended: boolean) {
    this.ended = ended;
  }
  private setInProgress(progress: boolean) {
    this.inProgress = progress;
  }

  public isBlackJack(): boolean {
    return (
      this.calculateValue(this.player.getCards()) == 21 ||
      this.calculateValue(this.dealer.getCards()) == 21
    );
  }

  public getWinner(): string {
    if (this.isBust()) {
      return this.calculateValue(this.player.getCards()) > 21 ? 'Dealer' : 'Player';
    } else if (this.isBlackJack()) {
      return this.calculateValue(this.player.getCards()) == 21 ? 'Player' : 'Dealer';
    } else if (this.isEnded())
      return this.calculateValue(this.player.getCards()) >
        this.calculateValue(this.dealer.getCards())
        ? 'Player'
        : 'Dealer';
    else return '';
  }

  public isDealerAbleToDraw() {
    return this.calculateValue(this.dealer.getCards()) < 16;
  }

  public isGameInProgress() {
    return this.inProgress;
  }
}

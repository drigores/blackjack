'use client';
import { ReactNode, useState } from 'react';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Message } from 'primereact/message';
import Blackjack from '../../_game/Blackjack';
import { Card } from '../../_game/_card/Card';
import './container.css';
import './cards.css';
import './table.css';

type PlayerProps = {
  name: string;
  value: number;
  hasHiddenCard: boolean;
  cards: Card[];
};

export default function BlackjackPage() {
  const [blackjack] = useState(new Blackjack());
  const [uiRefresher, setUIRefresher] = useState(true);

  const newGame = () => {
    blackjack.reset();
    setUIRefresher(!uiRefresher);
  };

  const hit = () => {
    blackjack.hit();
    setUIRefresher(!uiRefresher);
  };
  const stand = () => {
    blackjack.stand();
    setUIRefresher(!uiRefresher);
  };

  const disabled = () => {
    return blackjack.isEnded();
  };

  const Player = ({ name, value, cards, hasHiddenCard }: PlayerProps) => {
    return (
      <div className="player">
        <div>
          <Badge value={`${name} - ${value}`} size="xlarge" severity="info"></Badge>
        </div>
        <div className="flex w-full">
          {cards.map((card) => {
            return (
              <div key={`${card.Suit}-${card.Value}`} className="card">
                <div className="value">{card.Value}</div>
                <div className={`suit ${card.Suit.toLowerCase()}`}> </div>
              </div>
            );
          })}
        </div>
        <div>
          {hasHiddenCard && (
            <div className="card">
              <div className="value">??</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Actions = () => {
    return (
      <div className="actions">
        <Button
          onClick={() => {
            newGame();
          }}
          className="actionButton p-button-success"
          label="New Game"
          icon="pi pi-play"
        ></Button>
        {blackjack.isGameInProgress() && (
          <Button
            onClick={() => hit()}
            disabled={disabled()}
            className="actionButton"
            label="Hit"
            icon="pi pi-plus"
          ></Button>
        )}
        {blackjack.isGameInProgress() && (
          <Button
            onClick={() => stand()}
            disabled={disabled()}
            className="actionButton p-button-info"
            label="Stand"
            icon="pi pi-stop"
          ></Button>
        )}
      </div>
    );
  };

  const Messages = () => {
    return (
      <div className="center">
        {blackjack.isBust() && <Message severity="error" text="BUST!" />}
        {blackjack.isBlackJack() && <Message severity="success" text="BlackJack!" />}
        {disabled() && <Message severity="success" text={`Winner: ${blackjack.getWinner()} `} />}
      </div>
    );
  };

  type TableProps = {
    children: ReactNode | ReactNode[];
  };
  const Table = ({ children }: TableProps) => {
    return <div className="table">{children}</div>;
  };

  return (
    <div className="container">
      <Messages></Messages>
      <Table>
        <Player
          name="Dealer"
          value={blackjack.getDealerHandValue()}
          cards={blackjack.getDealerHand()}
          hasHiddenCard={blackjack.getDealerHand().length > 0 && blackjack.isDealerAbleToDraw()}
        ></Player>
        <Player
          name="Player"
          value={blackjack.getPlayerHandValue()}
          cards={blackjack.getPlayerHand()}
          hasHiddenCard={false}
        ></Player>
        <Actions></Actions>
      </Table>
    </div>
  );
}

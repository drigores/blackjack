'use client'
import { useEffect, useState } from "react";
import Blackjack from "./Blackjack";

export default function BlackjackPage(){
    const [blackjack, setBlackjack]= useState(new Blackjack());
    const [uiRender, setUiRender]= useState(true);


    const newGame = ()=>{
        blackjack.reset();
        setUiRender(!uiRender);
    }

    const hit = ()=>{
        blackjack.hit();
        setUiRender(!uiRender);
    }
    const stand = ()=>{
        blackjack.stand();
        setUiRender(!uiRender);
    }

    const disabled = ()=>{
        return blackjack.isEnded();
    }

    return (
    <div>
        {blackjack.isBust() && (
            <div> BUST! </div>
        )}
        {blackjack.isBlackJack() && (
            <div> BLACKJACK! </div>
        )}
        {disabled() && (
            <div> Winner: {blackjack.getWinner()} </div>
        )}
        <button onClick={()=>{newGame()} } >New Game</button>
        <button onClick={()=> hit()} disabled={disabled()}>Hit</button>
        <button onClick={()=> stand()} disabled={disabled()}>Stand</button>
        <div> 
            <div>Player Hand - Value: {blackjack.getPlayerHandValue()}</div>
            {blackjack.getPlayerHand().map(card =>{
                return (
                    <div key={`${card.Suit}-${card.Value}`}>Card: ${card.Suit}-${card.Value} </div>
                )
            })}
        </div>
        <div> 
            <div> Dealers Hand - Value: {blackjack.getDealerHandValue()}</div>
            {blackjack.getDealerHand().map(card =>{
                return (
                    <div key={`${card.Suit}-${card.Value}`}>Card: {card.Suit}-{card.Value} </div>
                )
            })}
        </div>
    </div>
    )
}
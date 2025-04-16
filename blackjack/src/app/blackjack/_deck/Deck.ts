import { Card } from "../_card/Card";

export default class Deck{
    private  suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    private  values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    private deck :Array<Card>;

    constructor(){
        this.deck = this.createDeck();
    }

    private createDeck =(): Card[]=>
    {
        let tempDeck = [];
        for (var i = 0 ; i < this.values.length; i++)
        {
            for(var x = 0; x < this.suits.length; x++)
            {
                var card = { Value: this.values[i], Suit: this.suits[x]};
                tempDeck.push(card);
            }
        }
        return tempDeck;
    }


    public shuffle = ()=>
    {
        let shuffledDeck = [...this.deck];
        for (var i = 0; i < 1000; i++)
        {
            var location1 = Math.floor((Math.random() * shuffledDeck.length));
            var location2 = Math.floor((Math.random() * shuffledDeck.length));
            var tmp = shuffledDeck[location1];

            shuffledDeck[location1] = shuffledDeck[location2];
            shuffledDeck[location2] = tmp;
        }
        this.deck = shuffledDeck;
    }


    public pop = (): Card => {
        let card = this.deck.pop();
        if(card) return card;
        else  throw new Error("No Cards Left");
    }

    public reset = ()=>{
        this.deck = this.createDeck();
    }

}
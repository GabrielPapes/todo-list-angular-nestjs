import { Card } from "../models/card.model";

export class CardStore {
  cards: any = {};
  _addCard(card: Card) {
    this.cards[card._id] = card;
    return card._id;
  }
  getCard(cardId: string = '') {
    return this.cards[cardId];
  }
  newCard(card: Card): string {
    return this._addCard(card);
  }
}
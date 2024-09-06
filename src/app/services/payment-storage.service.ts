import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentStorageService {
  private storageKey = "savedCardInfo";

  constructor() { }


  saveCardInfo(cardInfo:any):void{
    localStorage.setItem(this.storageKey,JSON.stringify(cardInfo));
  }

  getCardInfo(): any {
    const cardInfo = localStorage.getItem(this.storageKey);
    return cardInfo ? JSON.parse(cardInfo) : null;
  }

  clearCardInfo(): void {
    localStorage.removeItem(this.storageKey);
  }


}

import { Component } from '@angular/core';
import { AppComponent } from '../../app/app.component';
import { canBeNumber } from '../../util/validation';

@Component({
  selector: 'app-buytokens',
  templateUrl: './buytokens.component.html',
  styleUrls: ['./buytokens.component.css'],
})
export class BuytokensComponent {

  sendingAmount: number;
  recipientAddress: string;
  status: string;
  etherAmount: number;

  canBeNumber = canBeNumber; 

  constructor( private appcomponent : AppComponent ) { }


  buyTokens = () => {
    var bg;
    this.appcomponent.BetGame
      .deployed()
      .then(instance => {
        bg = instance;
        return bg.buyTokens({from:this.appcomponent.account,value:this.etherAmount*1000000000000000000});
      })
      .then(transaction => {
        this.setStatus('Transaction successful! '+transaction.tx);
        this.appcomponent.refreshBalance();
        console.log(transaction);  
      })
      .catch(e => {
        console.log(e);
        //this.setStatus('Error getting balance; see log.');
      });
  };

  setStatus = message => {
    this.status = message;
  };

  calculatePrice (event) {
    this.etherAmount = event.target.value / 5000;
  };

  isValid () {
    if( this.etherAmount && canBeNumber(this.etherAmount.toString()) ) {
      return true;
    } else { return false; }
  }

}

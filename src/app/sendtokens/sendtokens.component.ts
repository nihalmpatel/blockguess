import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app/app.component';
import { canBeNumber } from '../../util/validation';

@Component({
  selector: 'app-sendtokens',
  templateUrl: './sendtokens.component.html',
  styleUrls: ['./sendtokens.component.css']
})

export class SendtokensComponent implements OnInit {

  balance: number;
  sendingAmount: number;
  recipientAddress: string;
  status: string;

  canBeNumber = canBeNumber;

  constructor( private appcomponent : AppComponent ) { }

  ngOnInit() {
  }

  sendToken = () => {
    var gt;

    this.appcomponent.GamblingToken
    .deployed()
    .then((instance) => {
      gt = instance;
      return gt.transfer(this.recipientAddress,this.sendingAmount,{from:this.appcomponent.account});
    })
    .then((transaction) => {
      this.appcomponent.refreshBalance();
      this.setStatus('Transaction successful! '+transaction.tx);
      console.log(transaction);
    })
    .catch((e) => {
      this.setStatus('Transaction failed!');
      console.log(e);
    })
  }

  setStatus = message => {
    this.status = message;
  };

}

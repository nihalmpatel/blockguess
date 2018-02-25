import { Component, Injectable, HostListener, NgZone } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const GamblingTokenArtifacts = require('../../build/contracts/GamblingToken.json');
const betgameArtifacts = require('../../build/contracts/BetGame.json');
import { canBeNumber } from '../util/validation';

declare var window: any;

@Injectable()
export class ContractService {

  GamblingToken = contract(GamblingTokenArtifacts);
  BetGame = contract(betgameArtifacts);

  // TODO add proper types these variables
  account: any;
  accounts: any;
  web3: any;

  tokenBalance;

  canBeNumber = canBeNumber;

  constructor(private _ngZone: NgZone) {

  }

  /*
  buyTokens = (etherAmount) => {
    var bg;
    this.BetGame
      .deployed()
      .then(instance => {
        bg = instance;
        return bg.buyTokens({from:this.account,value:etherAmount*1000000000000000000});
      })
      .then(transaction => {
         console.log(transaction);
      
      })
      .catch(e => {
        console.log(e);
        //this.setStatus('Error getting balance; see log.');
      }); 
  };
*/


/*
  setStatus = message => {
    this.status = message;
  };

  sendCoin = () => {
    const amount = this.sendingAmount;
    const receiver = this.recipientAddress;
    let gbt;

    this.setStatus('Initiating transaction... (please wait)');

    this.GamblingToken
      .deployed()
      .then(instance => {
        gbt = instance;
        return gbt.transfer(receiver, amount, {
          from: this.account
        });
      })
      .then(transaction => {
        this.setStatus('Transaction complete! @ '+transaction.tx);
        this.refreshBalance();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  };


  */

}

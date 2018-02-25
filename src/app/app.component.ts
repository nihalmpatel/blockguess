import { Component, HostListener, NgZone } from '@angular/core';
import { canBeNumber } from '../util/validation';

import { ContractService } from './contract.service';

const Web3 = require('web3');
const contract = require('truffle-contract');
const GamblingTokenArtifacts = require('../../build/contracts/GamblingToken.json');
const betgameArtifacts = require('../../build/contracts/BetGame.json');

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  GamblingToken = contract(GamblingTokenArtifacts);
  BetGame = contract(betgameArtifacts);

  // TODO add proper types these variables
  account: any;
  accounts: any;
  web3: any;

  tokenBalance;
  etherBalance;
  canBeNumber = canBeNumber;

  constructor( private contractservice : ContractService, private _ngZone : NgZone ) {

  }

  @HostListener('window:load')
  windowLoaded() {
    this.checkAndInstantiateWeb3();
    this.onReady();
  }

  checkAndInstantiateWeb3 = () => {
    console.log('contract service!');
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 GamblingToken, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to http://localhost:7545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        //new Web3.providers.HttpProvider('http://localhost:9545')
        new Web3.providers.HttpProvider('http://127.0.0.1:7545')
      );
    }
  };

  onReady = () => {
    // Bootstrap the current providers
    this.GamblingToken.setProvider(this.web3.currentProvider);
    this.BetGame.setProvider(this.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert(
          'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
        );
        return;
      }

      // temp
      console.log(accs);
      // Remove this while deploying live
      if(this.web3.currentProvider.host == 'http://localhost:9545' || this.web3.currentProvider.host == 'http://127.0.0.1:7545') {
        var ind = prompt('Enter account index');
        this.account = accs[ind];
      } else {
        this.accounts = accs;
        this.account = this.accounts[0];
      } 

      this.refreshBalance();
          
    });
  };

  refreshBalance = () => {
    var bg;
    this.BetGame
      .deployed()
      .then(instance => {
        bg = instance;
        return bg.getBalance({from:this.account});
      })
      .then(value => {
        this.tokenBalance = value.toNumber();
        console.log('inner: '+value.toNumber());
      })
      .catch(e => {
        console.log(e);
        //this.setStatus('Error getting balance; see log.');
      }); 

      this.web3.eth.getBalance(this.account,(err,value)=>{
        if(err) {
          console.error('Error while fetching ether balance!') 
        } else {
          this.etherBalance = this.web3.fromWei(value.toNumber(),"ether");
        }
      })
  };

}

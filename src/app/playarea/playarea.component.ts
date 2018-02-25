import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app/app.component';

@Component({
  selector: 'app-playarea',
  templateUrl: './playarea.component.html',
  styleUrls: ['./playarea.component.css']
})
export class PlayareaComponent implements OnInit {

  playerType : string;
  playerName : string;

  constructor( private appcomponent : AppComponent ) { }

  ngOnInit() {
  }

  selectdrop = (event) => {
    this.playerType = event.target.value;
  }

  play = () => {
    var bg;
    /*if(this.playerType == 'Bidder') {
      this.appcomponent.BetGame
      .deployed((instance)=>{
        bg = instance;
        return bg.gamble(this.playerName,{from:this.appcomponent.account});
      })
      .then()
    } else {

    }*/
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BuytokensComponent } from './buytokens/buytokens.component';
import { ContractService } from './contract.service';
import { SendtokensComponent } from './sendtokens/sendtokens.component';
import { PlayareaComponent } from './playarea/playarea.component';

const appRoutes: Routes = [
  { path: '', redirectTo:'play', pathMatch:'full' },
  { path: 'buy', component: BuytokensComponent },
  { path: 'send', component: SendtokensComponent },
  { path: 'play', component: PlayareaComponent },
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    BuytokensComponent,
    SendtokensComponent,
    PlayareaComponent
  ],
  providers: [ContractService],
  bootstrap: [AppComponent]
})
export class AppModule { }

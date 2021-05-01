import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PlayboardComponent } from './game/playboard/playboard.component';
import { ScoreHistoryComponent } from './game/score-history/score-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ScoreComponent } from './game/playboard/score/score.component';
import { BoardComponent } from './game/playboard/board/board.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    WelcomeComponent,
    PlayboardComponent,
    ScoreHistoryComponent,
    PageNotFoundComponent,
    ScoreComponent,
    BoardComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

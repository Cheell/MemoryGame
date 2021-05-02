import { animate, state, style, transition, trigger } from '@angular/animations';
import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

interface IBulb {
  mode: 'light' | 'dark';
  color: string;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('shine', [
      state('dark', style({
        'filter': 'brightness(1)'
      })),
      state('light', style({
        'filter': 'brightness(3)'
      })),
      transition('dark <=> light', animate(1000))
    ])
  ]
})
export class BoardComponent implements OnInit, OnDestroy {
  isGameOver = false;
  IsPCPlaying = false;
  roundNumber = 1;
  bulbUsedPC = new Subject<boolean>();
  bulbUsedSubsc = new Subscription();
  bulbs: IBulb[] = [];
  pcHistory: number[] = [];
  colors: string[] = [
    'orangered 1%, green 30%',
    'orangered 1%, DarkBlue 30%',
    'orangered 1%, DarkTurquoise 30%',
    'orangered 1%, DarkSlateGray 30%',
    'orangered 1%, DarkOliveGreen 30%',
    'orangered 1%, Purple 30%'
  ];

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.initBulbs();
    this.pcRound();
  }

  private initBulbs(): void {
    this.bulbs = this.colors.map(c => ({mode: 'dark', color: 'radial-gradient(circle at center,' + c + ')'}));
  }

  private lightUp(index: number) {
    const bulb = this.bulbs[index];
    bulb.mode = bulb.mode === 'dark' ? 'light' : "dark";
    setTimeout (() => bulb.mode = bulb.mode === 'dark' ? 'light' : "dark", 1000);
  }

  private playOneBulb() {
    const bulbIndex = Math.floor(Math.random()* 6);
    this.lightUp(bulbIndex);
    this.pcHistory.push(bulbIndex);
    setTimeout(() => { this.bulbUsedPC.next(true) }, 2000);
  }

  private pcRound() {
    this.IsPCPlaying = true;
    this.pcHistory = [];
    setTimeout(() => this.playOneBulb(), 1500);
    this.bulbUsedSubsc = this.bulbUsedPC.subscribe(
      () =>
      {
        if (this.pcHistory.length < this.roundNumber) {
          this.playOneBulb();
        } else {
          setTimeout(() => this.IsPCPlaying = false, 1500);
        }
      }
    )
  }

  public guessBulb(index: number) {
    if (this.IsPCPlaying) { return; }

    this.bulbUsedSubsc.unsubscribe();
    this.lightUp(index);
    if (this.pcHistory.shift() === index) {
      this.roundContinue();
    } else {
      this.roundFail();
    }
  }

  public restart() {
    this.isGameOver = false;
    this.pcRound();
  }

  public welcomeScreen() {
    this.router.navigate(['welcome']);
  }

  private roundContinue() {
    if (this.pcHistory.length === 0) {
      const currentScore = this.data.currentScore;
      currentScore.next(currentScore.getValue() + 10);
      this.roundNumber++;
      this.IsPCPlaying = true;
      setTimeout(() => this.pcRound(), 2000);
    } else {
      // All fine we continue
    }
  }

  private roundFail() {
    this.IsPCPlaying = true;
    this.data.setScore();
    this.roundNumber = 1;
    setTimeout(() => this.isGameOver = true, 2000);
  }



  ngOnDestroy(): void {
    this.bulbUsedPC.unsubscribe();
  }

}

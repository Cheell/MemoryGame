import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IScore {
  score: number;
  playerName: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  player = new BehaviorSubject<string>('');
  scores = new BehaviorSubject<IScore[]>([]);
  currentScore = new BehaviorSubject<number>(0);

  constructor() {
    this.scores.next([
      {
        date: new Date(),
        playerName: 'SomeBody',
        score: 10
      },
      {
        date: new Date(),
        playerName: 'AnotherOne',
        score: 40
      },
      {
        date: new Date(),
        playerName: 'AnyGuy',
        score: 20
      }
    ])
   }

  setScore() {
    this.scores.next([...this.scores.getValue(), {
      playerName: this.player.getValue(),
      score: this.currentScore.getValue(),
      date: new Date()
    }])
    this.currentScore.next(0);
  }
}

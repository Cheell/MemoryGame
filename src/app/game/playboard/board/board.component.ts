import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

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
      transition('dark => light', animate(1000)),
      transition('light => light', animate(1000)),
      transition('light => dark', animate(1000))
    ])
  ]
})
export class BoardComponent implements OnInit {
  bulbs: IBulb[];
  colors: string[] = [
    'orangered 1%, green 30%',
    'orangered 1%, DarkBlue 30%',
    'orangered 1%, DarkTurquoise 30%',
    'orangered 1%, DarkSlateGray 30%',
    'orangered 1%, DarkOliveGreen 30%',
    'orangered 1%, Purple 30%'
  ];

  constructor() {
    this.initBulbs();
  }



  ngOnInit(): void {
  }

  private initBulbs(): void {
    this.bulbs = [];
    this.bulbs = this.colors.map(c => ({mode: 'dark', color: 'radial-gradient(circle at center,' + c + ')'}));
    console.log(this.bulbs);
  }

  public lightUp() {
    this.bulbs.forEach( b => b.mode = b.mode === 'dark' ? 'light' : "dark");
    console.log(this.bulbs);
  }
}

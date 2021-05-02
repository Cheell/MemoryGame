import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  playerName  = '';
  score = 0;
  best = 0;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.player.subscribe(p => this.playerName = p);
    this.data.currentScore.subscribe( v => this.score = v );
    this.data.scores.subscribe( s => this.best = s.length > 0 ? Math.max(...s.map(r => r.score)) : 0)
  }

}

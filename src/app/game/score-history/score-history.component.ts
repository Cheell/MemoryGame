import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DataService, IScore } from 'src/app/service/data.service';

@Component({
  selector: 'app-score-history',
  templateUrl: './score-history.component.html',
  styleUrls: ['./score-history.component.scss']
})
export class ScoreHistoryComponent implements OnInit {

  scores: IScore[] = [];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.scores.subscribe( s => {
      this.scores = [...s.sort((b, a) => a.score - b.score)];
    })
  }

}

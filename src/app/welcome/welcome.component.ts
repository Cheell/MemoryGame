import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private data: DataService) { }
  playerName = '';

  ngOnInit(): void {
    this.data.player.next(this.playerName);
  }

  startGame() {
    this.data.player.next(this.playerName);
    this.router.navigate(['game']);
  }
}

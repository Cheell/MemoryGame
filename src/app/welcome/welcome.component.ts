import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router) { }
  playerName = '';

  ngOnInit(): void {
  }

  startGame() {
    console.log(this.playerName, 'playerName');
    var a = this.router.navigate(['game']);
    console.log(a);

  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title: string = 'BoomClub';

  constructor() { }

  ngOnInit(): void {    
    document.getElementById("sidebarhome").className += " active"
  }

  ngOnDestroy(): void {
    document.getElementById("sidebarhome").classList.remove("active")
  }

  titulo() {
    this.title = 'Hola'
  }
}

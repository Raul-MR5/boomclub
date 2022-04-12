import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hola: any[] = [
    {
      username: "hola"
    },
    {
      username: "hola1"
    },
    {
      username: "hola2"
    }
  ];

  constructor() { }

  ngOnInit(): void {    
    document.getElementById("sidebarhome").className += " active"
  }

  ngOnDestroy(): void {
    document.getElementById("sidebarhome").classList.remove("active")
  }
}

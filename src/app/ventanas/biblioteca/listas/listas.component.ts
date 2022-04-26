import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss']
})
export class ListasComponent implements OnInit {

  prueba = []

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {    
    document.getElementById("listas").className += " active"

    for (let i = 1; i <= 20; i++) {
      this.prueba.push(i)
    }
  }

  ngOnDestroy(): void {
    document.getElementById("listas").classList.remove("active")
  }

  goTo(url: string) {
    this.router.navigate(['/biblioteca/' + url]);
  }
}

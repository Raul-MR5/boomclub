import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss']
})
export class ArtistasComponent implements OnInit {

  prueba = []

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {    
    document.getElementById("artistas").className += " active"
    
    for (let i = 1; i <= 20; i++) {
      this.prueba.push(i)
    }
  }

  ngOnDestroy(): void {
    document.getElementById("artistas").classList.remove("active")
  }

  goTo(url: string) {
    this.router.navigate(['/biblioteca/' + url]);
  }
}

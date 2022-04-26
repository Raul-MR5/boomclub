import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  prueba = [1,2,3,4,5]
  user;
  photo;
  title: string = 'BoomClub';

  constructor(private authSrv: AuthService,) { }

  ngOnInit(): void {    
    document.getElementById("sidebarhome").className += " active"
    this.user = this.authSrv.getUsuario()
    this.user.subscribe(user => {
      this.photo = user.photoURL
    })
  }

  ngOnDestroy(): void {
    document.getElementById("sidebarhome").classList.remove("active")
  }

  titulo() {
    this.title = 'Hola'
  }
}

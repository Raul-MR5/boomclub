import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// import { AccountService } from 'src/app/shared/services/account.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    // private accountSrv: AccountService,
    public authSrv: AuthService,
    private firebase: AngularFirestore
  ) { }

  ngOnInit(): void {// Validacion de si existe en local storage 'usuasio', si existe redireccion a /
    if (localStorage.getItem('usuario')) {
      this.router.navigate(['/']);
    }

    this.form = this.formBuilder.group({
      user: '',
      password: ''
    });
  }

  async submit() {
    //this.firebase.collection('Usuarios').get();

    // this.authSrv.login(this.form.value.user, this.form.value.password)
    // .subscribe(
    //   () => {
    //     this.router.navigate(['/']);
    //   }
    // );

    try {
      console.log(this.form.value.user, this.form.value.password);
      
      

      await this.authSrv.login(this.form.value.user, this.form.value.password).then(user => {
        if (user) {
          this.authSrv.getUsuario().subscribe(user => {
            if (user.emailVerified) {
              this.router.navigate(['/']);
            } else {
              alert("Verifique su email");
              this.authSrv.logout();
            }
          })
        }
      })
      
    } catch (e: any) {      
      alert(e.message)
    }
  }

  async google(){
    try {
      console.log(this.form.value.user, this.form.value.password);
      
      await this.authSrv.googleAuth().then(user => {
        if (user) {
          console.log("entras");
          this.router.navigate(['/']);
        }
      })
      
    } catch (e: any) {
      console.log("hola");
      
      alert(e.message)
    }
  }
}

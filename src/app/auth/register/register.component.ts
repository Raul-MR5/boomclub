import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    // private accountSrv: AccountService,
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('usuario')) {
      this.router.navigate(['/']);
    }

    this.form = this.formBuilder.group({
      id: [''],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apellidos: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      activo: [''],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required],
      fecAltaShow: [{ value: '' }],
      fecAlta: [''],
      fecBaja: [''],
      rol: ['']
    });
  }

  // submit(): void {
  //   var nUser: any = {
  //     id: this.form.value.id,
  //     username: this.form.value.username,
  //     password: this.form.value.password,
  //     email: this.form.value.email,
  //     nombre: this.form.value.nombre,
  //     apellidos: this.form.value.apellidos,
  //     fecAlta: new Date,
  //     fecBaja: null,
  //     activo: true,
  //     rol: {
  //       id: 2
  //     }
  //   }

  //   this.usuarioSrv.create(nUser)
  //     .subscribe(
  //       () => {
  //         this.router.navigate(['/login']);
  //       }
  //     );

  //   // this.accountSrv.login(this.form.value.user, this.form.value.password)
  //   //   .subscribe(
  //   //     () => {
  //   //       this.router.navigate(['/login']);
  //   //     }
  //   //   );
  // }

  async submit() {
    //this.firebase.collection('Usuarios').get();

    try {
      console.log(this.form.value.email, this.form.value.password);

      await this.authSrv.register(this.form.value.email, this.form.value.password).then(user => {
        if (user) {
          this.router.navigate(['/login']);
        }
      })
    } catch (e: any) {
      alert(e.message)
    }
  }
}

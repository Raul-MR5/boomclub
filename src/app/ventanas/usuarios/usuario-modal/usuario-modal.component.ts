import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from '@app/shared/models/rol.model';
import { Usuario } from '@app/shared/models/usuario.model';
import { entityCacheSelectorProvider } from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { Observable } from 'rxjs';

import { Action as rolActions } from '../../roles/state/rol.actions';
import * as fromRol from '../../roles/state/rol.reducer';
import { Action as usuarioActions } from '../state/usuario.actions';
import * as fromUsuario from '../state/usuario.reducer';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss']
})
export class UsuarioModalComponent implements OnInit {

  visible: boolean = false;

  @ViewChild(Calendar) calendar: Calendar;

  loading$: Observable<boolean> = this.usuarioStore.select(fromUsuario.getLoading);
  usuario$: Observable<Usuario> = this.usuarioStore.select(fromUsuario.getSelected);
  created$: Observable<boolean> = this.usuarioStore.select(fromUsuario.getCreated);
  updated$: Observable<boolean> = this.usuarioStore.select(fromUsuario.getUpdated);
  error$: Observable<any> = this.usuarioStore.select(fromUsuario.getError);
  errores: string[] = [];
  form: FormGroup;
  es: any;
  filteredRoles: Rol[];
  roles: Rol[];
  creationMode: boolean;
  prepared: boolean = false;
  submitB: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private rolStore: Store<fromRol.AppState>,
    private usuarioStore: Store<fromUsuario.AppState>,
    private datePipe: DatePipe,
    private toastSrv: MessageService,
    private translateSrv: TranslateService,
    private config: PrimeNGConfig,
  ) { translateSrv.setDefaultLang('es'); }

  ngOnInit(): void {
    this.translate('es')
    this.translateSrv.get('user.confirmation.toastSuccess').subscribe()

    this.rolStore.select(fromRol.getAll).subscribe(
      roles => {
        this.roles = roles;
        this.filteredRoles = this.roles;
        console.log(this.roles);
      }
    );

    
    

    this.rolStore.dispatch(rolActions.loadAll({ payload: null }));
    this.form = this.formBuilder.group({
      id: [''],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      activo: ['', Validators.required],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required],
      fecAltaShow: [{ value: '', disabled: true }],
      fecAlta: [''],
      fecBaja: [''],
      rol: ['', Validators.required]
    });

    this.created$.subscribe(create => {
      if(create){
        this.onHide();
        let message = ''
        this.translateSrv.get('user.confirmation.toastSuccess').subscribe( mess => {
          message = mess
        })
        this.toastSrv.add({ severity: 'success', summary: 'Created', detail: message });
      }
    });

    this.error$.subscribe(error => {
      console.log(error);
      if (!error)
        return;

      this.errores = [];
      error.subErrors.forEach(subError => {
        this.form.controls[subError.field].setErrors({ incorrect: true });
        this.errores[subError.field] = subError.message;
      });
    });

    this.usuarioStore.select(fromUsuario.getUpdated).subscribe(updated => {
      if (updated) {
        this.visible = false;
        let message = ''
        this.translateSrv.get('user.confirmation.toastUpdate').subscribe( mess => {
          message = mess
        })
        this.toastSrv.add({ severity: 'success', summary: 'Updated', detail: message })
      }
    });

    this.usuario$.subscribe(usuario => {
      this.patchValue(usuario)
    });

    this.rolStore.select(fromRol.getSelected).subscribe(rol => {
      if (this.prepared && rol) {
        var activo: boolean;
        activo = !(this.f.fecBaja.value && new Date(this.f.fecBaja.value).getTime() <= new Date().getTime());
        var fecBaja = this.f.fecBaja.value ? this.f.fecBaja.value.getTime() : null;

        var result: Usuario = {
          id: this.f.id.value,
          username: this.f.username.value,
          email: this.f.email.value,
          nombre: this.f.nombre.value,
          apellidos: this.f.apellidos.value,
          fecAlta: this.f.fecAlta.value,
          fecBaja: fecBaja,
          activo: activo,
          rol: rol
        }

        console.log(result)

        if (this.creationMode) {
          var password: string = this.f.password.value;
          if (password === this.f.repeat_password.value) {
            result.password = password;
            this.usuarioStore.dispatch(usuarioActions.create({ payload: result }));
          }
          else
            console.error(this.translateSrv.instant('user.modal.passwordComp'));
        } else {
          this.usuarioStore.dispatch(usuarioActions.update({ payload: result }));
        }
        this.prepared = false;
        this.rolStore.dispatch(rolActions.unload());
      }
    });
  }

  translate(lang: string) {
    this.translateSrv.use(lang);
    this.translateSrv.get('calendar').subscribe(res => this.config.setTranslation(res));
  }

  ngAfterViewInit(): void {
    this.form.controls.password.valueChanges.subscribe(e => { this.comparePassword() });
    this.form.controls.repeat_password.valueChanges.subscribe(e => { this.comparePassword() });
  }

  send() {
    this.submitB = true

    if (this.form.invalid) {
      this.toastSrv.add({ severity: 'warn', summary: 'Error', detail: this.translateSrv.instant('user.modal.invalid') });
      let errorCampo = this.translateSrv.instant('user.modal.error');
      for (let name in this.form.controls) {
        let control = this.form.controls[name];
        let nameTrad = this.translateSrv.instant('user.model.' + name)

        if (control.invalid && control.value == '' || control.invalid && control.value == null) {
          this.errores[name] = errorCampo + nameTrad
        }
      }
      return;
    }

    this.prepared = true;
    this.rolStore.dispatch(rolActions.unload());
    this.rolStore.dispatch(rolActions.loadOne({ id: this.f.rol.value.id }));
    
  }

  filterRoles(event) {
    this.filteredRoles = [];
    for (let i = 0; i < this.roles.length; i++) {
      let rol = this.roles[i];
      if (rol.codigo.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredRoles.push(rol);
      }
    }
  }

  show(creationMode: boolean) {
    this.patchValue(null)
    this.creationMode = creationMode;
    if (creationMode) {
      this.usuarioStore.dispatch(usuarioActions.unload());
      this.f.password.enable();
      this.f.repeat_password.enable();
    } else {
      this.f.password.disable();
      this.f.repeat_password.disable();
    }
    
    this.visible = true;
  }

  onHide() {
    this.visible = false;
    this.errores = [];
    this.usuarioStore.dispatch(usuarioActions.unload());
    this.form.reset();
    this.submitB = false;
  }

  onInputFecBaja(fecha: string) {
    try {
      this.onChangeFecBaja(<Date>this.calendar.parseValueFromString(fecha));
    } catch (error) {
    }
  }

  onChangeFecBaja(fecha: Date) {
    this.f.activo.setValue(fecha == null || fecha.getTime() > new Date().getTime());
  }

  comparePassword() {
    if (this.form.controls.password.value && this.form.controls.repeat_password.value) {
      if (this.form.controls.password.value != this.form.controls.repeat_password.value) {
        this.errores['passwordComp'] = this.translateSrv.instant('user.modal.passwordComp')
      } else {
        this.errores['passwordComp'] = ''
      }
    } else {
      this.errores['passwordComp'] = ''
    }

  }

  patchValue(usuario: Usuario){
    if (usuario) {
      var fecBaja = usuario.fecBaja ? new Date(usuario.fecBaja) : null;
      this.form.patchValue({
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        activo: usuario.activo,
        fecAlta: usuario.fecAlta,
        fecAltaShow: this.datePipe.transform(new Date(usuario.fecAlta), 'dd-MM-yyy'),
        fecBaja: fecBaja,
        rol: usuario.rol
      });
    } else {
      this.form.patchValue({
        id: null,
        username: '',
        email: '',
        nombre: '',
        apellidos: '',
        pasword: '',
        repeat_password: '',
        activo: false,
        fecAlta: new Date(),
        fecBaja: null,
        rol: null
      });
    }
  
  }

  get f() { return this.form.controls; }
}

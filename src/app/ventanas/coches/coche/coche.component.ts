import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CocheService } from 'src/app/shared/services/coche.service';

import { Coche } from 'src/app/shared/models/coche.model';
import { Usuario } from 'src/app/shared/models/usuario.model';

import * as fromAccount from 'src/app/shared/state/account/account.reducer';
import { Action as accountActions } from 'src/app/shared/state/account/account.actions';

import { Store } from '@ngrx/store';
import { Action as usuarioActions } from '../../usuarios/state/usuario.actions';
import * as fromUsuario from '../../usuarios/state/usuario.reducer';
import { Action as cocheActions } from '../state/coche.actions';
import * as fromCoche from '../state/coche.reducer';

import { Observable } from 'rxjs';
import { RequestFilter } from 'src/app/shared/models/request-filter';

@Component({
  selector: 'app-coche',
  templateUrl: './coche.component.html',
  styleUrls: ['./coche.component.scss']
})
export class CocheComponent implements OnInit, OnDestroy {

  form: FormGroup;
  usuarios: Usuario[];

  entities$: Observable<Usuario[]> = this.usuarioStore.select(fromUsuario.getAll);

  requestFilter: RequestFilter;
  permisos: string[] = [];

  userSelected: any

  constructor(
    private formBuilder: FormBuilder,
    private cocheStore: Store<fromCoche.AppState>,
    private usuarioStore: Store<fromUsuario.AppState>,
    private http: HttpClient,
    private router: Router,
    private cocheSrv: CocheService
  ) { }

  ngOnInit(): void {
    document.getElementById("sidebarcrear").className += " active";

    // this.accountStore.select(fromAccount.getPermisos).subscribe(p => this.permisos = p.map(permiso => permiso.codigo));

    this.entities$.subscribe(e => { if (e) { this.usuarios = e }; console.log(this.usuarios) });

    this.requestFilter = {
      size: 35,
      page: 0,
      sort: [],
      filter: []
    };

    // this.accountStore.dispatch(accountActions.loadPermisos());
    
    this.usuarioStore.dispatch(usuarioActions.loadAll({ payload: this.requestFilter }));

    this.form = this.formBuilder.group({
      id: '',
      modelo: ['', Validators.required],
      bastidor: ['', [Validators.required, Validators.pattern("^[0-9]{10,10}[A-Za-z]{2,2}$")]],
      usuario: ['', Validators.required],
      fecProd: '',
      fecVenta: ''
    });
  }

  send(f) {
    console.log(f.value.usuario.username);
    console.log(f);
    

    var result: Coche = {
      id: f.value.id,
      modelo: f.value.modelo,
      bastidor: f.value.bastidor,
      usuario: f.value.usuario,
      fecProd: f.value.fecProd,
      fecVenta: f.value.fecVenta
    }

    if (f.invalid) {
      console.log('entra');
      
      return;
    }

    this.cocheStore.dispatch(cocheActions.create({ payload: result }));

  }

  ngOnDestroy(): void {
    document.getElementById("sidebarcrear").classList.remove("active");
  }
}

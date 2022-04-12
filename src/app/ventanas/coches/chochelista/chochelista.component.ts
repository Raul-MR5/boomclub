import { Component, OnInit } from '@angular/core';
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
  selector: 'app-chochelista',
  templateUrl: './chochelista.component.html',
  styleUrls: ['./chochelista.component.scss']
})
export class ChochelistaComponent implements OnInit {

  form: FormGroup;
  coches: Coche[];
  usuarios: Usuario[];

  edit: boolean = true;

  entities$: Observable<Coche[]> = this.cocheStore.select(fromCoche.getAll);
  users$: Observable<Usuario[]> = this.usuarioStore.select(fromUsuario.getAll);
  

  requestFilter: RequestFilter;
  permisos: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private usuarioStore: Store<fromUsuario.AppState>,
    private cocheStore: Store<fromCoche.AppState>,
    private http: HttpClient,
    private router: Router,
    private cocheSrv: CocheService
 ) { }

  ngOnInit(): void {    
    document.getElementById("sidebarlista").className += " active"
    this.entities$.subscribe(e => { if (e) { this.coches = e }; console.log(this.coches) });
    this.users$.subscribe(e => { if (e) { this.usuarios = e }; console.log(this.usuarios) });

    this.requestFilter = {
      size: 35,
      page: 0,
      sort: [],
      filter: []
    };
    
    this.cocheStore.dispatch(cocheActions.loadAll({ payload: this.requestFilter }));
    this.usuarioStore.dispatch(usuarioActions.loadAll({ payload: this.requestFilter }));

    this.form = this.formBuilder.group({
      modelo: ['', Validators.required],
      bastidor: ['', [Validators.required, Validators.pattern('^[0,9]{10,10}[A-Za-z]{2,2}$')]],
      usuario: ['', Validators.required],
      fecProd: '',
      fecVenta: ''
    });
  }

  selected(usuario: Usuario, coche: Coche): boolean{
    console.log(usuario);
    console.log(coche.usuario);
    
    if (usuario == coche.usuario) {
      return true;
    } else{
      return false;
    }
  }

  ngOnDestroy(): void {
    document.getElementById("sidebarlista").classList.remove("active")
  }
}

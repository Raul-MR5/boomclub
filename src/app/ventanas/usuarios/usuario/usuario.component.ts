import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldConfig } from '@app/shared/models/field-config';
import { Permiso } from '@app/shared/models/permiso.model';
import { RequestFilter } from '@app/shared/models/request-filter';
import { TableConfig } from '@app/shared/models/table-config/table-config';
import { Usuario } from '@app/shared/models/usuario.model';
import { Action as accountActions } from '@app/shared/state/account/account.actions';
import * as fromAccount from '@app/shared/state/account/account.reducer';
import { select, Store } from '@ngrx/store';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { LazyLoadEvent, SortEvent } from 'primeng/api/public_api';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Action as usuarioActions } from '../state/usuario.actions';
import * as fromUsuario from '../state/usuario.reducer';
import { UsuarioModalComponent } from '../usuario-modal/usuario-modal.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: []
})
export class UsuarioComponent implements OnInit {

  @ViewChild(UsuarioModalComponent) modal: UsuarioModalComponent;

  entities$: Observable<Usuario[]> = this.store.select(fromUsuario.getAll);
  loading$: Observable<boolean> = this.store.select(fromUsuario.getLoading);
  totalRecords$: Observable<number> = this.store.select(fromUsuario.getTotalRecords);
  permisos: string[] = [];
  requestFilter: RequestFilter;
  tableConfig: TableConfig;

  constructor(
    private store: Store<fromUsuario.AppState>,
    private accountStore: Store<fromAccount.AppState>,
    private confirmationSrv: ConfirmationService,
    private messageSrv: MessageService,
    private translateSrv: TranslateService,
  ) {this.translateSrv.setDefaultLang('es') }

  ngOnInit(): void {
    this.accountStore.select(fromAccount.getPermisos).subscribe(p => this.permisos = p.map(permiso => permiso.codigo));

    this.translateSrv.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarPagina();
    });

    this.requestFilter = {
      size: 5,
      page: 0,
      sort: [],
      filter: []
    };
    this.cargarPagina();
    this.getAll();
  }

  getAll() {
    this.accountStore.dispatch(accountActions.loadPermisos());
    this.store.dispatch(usuarioActions.loadAll({ payload: this.requestFilter }));
  }

  onClick(event) {
    switch (event.type) {
      case 'add': {
        this.modal.show(true);
        break;
      }
      case 'edit': {
        this.modal.show(false);
        this.store.dispatch(usuarioActions.loadOne({id: event.data.id}));
        //this.router.navigate([`${event.data.id}`], {relativeTo: this.activatedRoute});
        break;
      }
      case 'delete': {
        this.confirmationSrv.confirm({
          message: this.translateSrv.instant('user.confirmation.message'),
          header: this.translateSrv.instant('user.confirmation.header'),
          icon: 'pi pi-info-circle',
          rejectLabel: this.translateSrv.instant('user.confirmation.rejectLabel'),
          acceptLabel: this.translateSrv.instant('user.confirmation.acceptLabel'),
          accept: () => {
            this.store.dispatch(usuarioActions.delete({ id: event.data.id }));
            this.messageSrv.add({ severity: 'success', summary: 'Delete', detail: this.translateSrv.instant('user.confirmation.toastDelete') });
          },
          reject: (type) => {
            switch (type) {
              case ConfirmEventType.REJECT:
                // this.messageSrv.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                break;
              case ConfirmEventType.CANCEL:
                // this.messageSrv.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                break;
            }
          }
        });

        break;
      }
    }
  }

  onRowEditInit(usuario: Usuario) {
    this.store.dispatch(usuarioActions.loadOne({ id: usuario.id }));
    //this.modal.show(false);
  }

  cargarPagina(){
    this.tableConfig = {
      fieldConfig: [
        { field: 'username', nombre: this.translateSrv.instant('user.model.username'), sort: true, filter: true },
        { field: 'nombre', nombre: this.translateSrv.instant('user.model.nombre'), sort: true, filter: true },
        { field: 'apellidos', nombre: this.translateSrv.instant('user.model.apellidos'), sort: true, filter: true },
        { field: 'email', nombre: this.translateSrv.instant('user.model.email'), sort: true, filter: true },
        { field: 'fecAlta', nombre: this.translateSrv.instant('user.model.fecAlta'), sort: true, filter: false, permisos: ['ONLY_ADMIN'], tipo: 'FECHA' },
        { field: 'fecBaja', nombre: this.translateSrv.instant('user.model.fecBaja'), sort: true, filter: false, permisos: ['ONLY_ADMIN'], tipo: 'FECHA_HORA' },
        { field: 'activo', nombre: this.translateSrv.instant('user.model.activo'), sort: false, filter: false, permisos: ['ONLY_ADMIN'], tipo: 'ACTIVO' }
      ],
      optionButtons: [
        { action: 'edit', icon: 'pi pi-pencil' },
        { action: 'delete', icon: 'pi pi-trash' }
      ],
      topButtons: [
        { action: 'add', icon: 'pi pi-plus', label: this.translateSrv.instant('user.add') }
      ]
    };
  }

}

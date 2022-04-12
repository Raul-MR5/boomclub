import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';
import { AuthGuard } from 'src/app/core/helpers/auth.guard';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { CardModule} from 'primeng/card';
import { MessageModule} from 'primeng/message';
import { TablaGenericaModule } from '@app/shared/components/tabla-generica/tabla-generica.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UsuarioStateModule } from './state/usuario-state.module';
import { RolStateModule } from '../roles/state/rol-state.module';
import { BaseFormModule } from '../../../../../shared/components/base-form/base-form.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

const routes: Routes = [
  { path: '', component: UsuarioComponent, canActivate: [AuthGuard], pathMatch: "full" },
  { path: ':id', component: UsuarioFormComponent, canActivate: [AuthGuard]}
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [UsuarioComponent, UsuarioModalComponent, UsuarioFormComponent],
  imports: [
    BaseFormModule,

    TablaGenericaModule,

    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    InputSwitchModule,
    PaginatorModule,
    ProgressSpinnerModule,
    TableModule,
    ToastModule,
    CardModule,
    MessageModule,
    ConfirmDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      },
      isolate: true
    }),

    CommonModule,
    RouterModule.forChild(routes),
    UsuarioStateModule,
    RolStateModule
  ],
  providers: [
    DatePipe,
    MessageService,
    PrimeNGConfig,
    ConfirmationService
  ]
})
export class UsuariosModule { }

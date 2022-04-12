import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocheComponent } from './coche.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown'
import {SelectButtonModule} from 'primeng/selectbutton';

import { AuthGuard } from '../../../auth/auth.guard';

import { UsuarioStateModule } from '../../usuarios/state/usuario-state.module';
import { CocheStateModule } from '../state/coche-state.module';

const routes: Routes = [
  { path: '', component: CocheComponent, canActivate: [AuthGuard], pathMatch: "full" }
];


@NgModule({
  declarations: [CocheComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    FormsModule,
    SelectButtonModule,
    ReactiveFormsModule,
    DropdownModule,

    UsuarioStateModule,
    CocheStateModule
  ],
  exports: [RouterModule]
})
export class CocheModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../../auth/auth.guard';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListasComponent } from './listas.component';

const routes: Routes = [
  {
    path: '',
    component: ListasComponent,
    canActivate: [AuthGuard],
    // children: [
    //   { path: '', loadChildren: () => import('src/app/ventanas/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard], pathMatch: "full"},
    //   // { path: 'biblioteca',  loadChildren: () => import('src/app/ventanas/coches/coche/coche.module').then(m => m.CocheModule), canActivate: [AuthGuard]}
    // ]
  }
];

@NgModule({
  declarations: [
    ListasComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    FormsModule,
    ReactiveFormsModule,

    AngularFirestoreModule,
    AngularFireAuthModule,

    HttpClientModule
  ],
  exports: [RouterModule]
})
export class ListasModule { }

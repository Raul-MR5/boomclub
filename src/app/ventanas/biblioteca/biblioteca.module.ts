import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../auth/auth.guard';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { TabmenuComponent } from './tabmenu/tabmenu.component';

const routes: Routes = [
  {
    path: '',
    component: TabmenuComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('src/app/ventanas/biblioteca/listas/listas.module').then(m => m.ListasModule), canActivate: [AuthGuard], pathMatch: "full"},
      { path: 'artistas',  loadChildren: () => import('src/app/ventanas/biblioteca/artistas/artistas.module').then(m => m.ArtistasModule), canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  declarations: [
    TabmenuComponent,
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
export class BibliotecaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

import { AuthGuard } from '../auth/auth.guard';

import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('src/app/ventanas/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard], pathMatch: "full"},
      { path: 'biblioteca',  loadChildren: () => import('src/app/ventanas/biblioteca/biblioteca.module').then(m => m.BibliotecaModule), canActivate: [AuthGuard]},
      // { path: 'lista',  loadChildren: () => import('src/app/ventanas/coches/chochelista/chochelista.module').then(m => m.ChochelistaModule), canActivate: [AuthGuard]},
      // { path: 'perifericos',  loadChildren: () => import('@app/features/components/backoffice/tablas/perifericos/perifericos.module').then(m => m.PerifericoModule), canActivate: [AuthGuard]},
      // { path: 'persona',  loadChildren: () => import('@app/features/components/backoffice/tablas/personas/persona.module').then(m => m.PersonaModule), canActivate: [AuthGuard]},
      // { path: 'hospital',  loadChildren: () => import('@app/features/components/backoffice/tablas/hospital/hospital.module').then(m => m.HospitalModule), canActivate: [AuthGuard]},
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
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
export class DashboardModule { }

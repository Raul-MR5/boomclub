import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsuarioEffect } from './usuario.effects';
import { usuarioReducer } from './usuario.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    EffectsModule.forFeature([UsuarioEffect]),
    StoreModule.forFeature("usuarios", usuarioReducer)
  ]
})
export class UsuarioStateModule { }

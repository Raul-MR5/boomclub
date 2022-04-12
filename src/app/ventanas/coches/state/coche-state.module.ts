import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CocheEffect } from './coche.effects';
import { cocheReducer } from './coche.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    EffectsModule.forFeature([CocheEffect]),
    StoreModule.forFeature("coches", cocheReducer)
  ]
})
export class CocheStateModule { }

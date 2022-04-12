import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { EntityDataModule, DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AngularFireModule } from '@angular/fire/compat';
import { entityConfig } from './entity-metadata';
import { environment } from 'src/environments/environment';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { environment } from '../environments/environment';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { provideStorage, getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HttpClientModule,

    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),

    EntityDataModule.forRoot(entityConfig),

    AngularFireModule.initializeApp(environment.firebase)

    // provideFirebaseApp(() => initializeApp(environment.firebase)), 
    // provideAuth(() => getAuth()), 
    // provideFirestore(() => getFirestore()), 
    // provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

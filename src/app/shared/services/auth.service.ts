import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import * as jwt_decode from 'jwt-decode';
import { Permiso } from '../models/permiso.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario: Observable<Usuario>;

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth
  ) {}

  login(username: string, password: string) {
    return this.auth.signInWithEmailAndPassword(username, password);
  }

  logout() {
    localStorage.removeItem('usuario');
  }

  solicitarPassword(email: string): Observable<string> {
    return this.http.post<any>(`${environment.apiUrl}/usuarios/reset-password?email=${email}`, {});
  }

  recuperarPassword(token: string, password: string): Observable<string> {
    return this.http.put<any>(`${environment.apiUrl}/usuarios/reset-password/${token}`, {password: password});
  }

  getUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/account`);
  }

  getPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(`${environment.apiUrl}/account/permisos`);
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('usuario')).token;
  }

}

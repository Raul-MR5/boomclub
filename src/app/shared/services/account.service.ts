import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import * as jwt_decode from 'jwt-decode';
import { Permiso } from '../models/permiso.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private usuarioSubject: BehaviorSubject<Usuario>;
  public usuario: Observable<Usuario>;

  constructor(
    private http: HttpClient
  ) {
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
    this.usuario = this.usuarioSubject.asObservable();
  }
  
  public get usuarioValue(): Usuario {
    return this.usuarioSubject.value;
  }

  login(username: String, password: String) {
    return this.http.post<any>(`${environment.backUrl}/login`, {"username": username, "password": password})
      .pipe(
        map(response => {
          var usuario: Usuario = {
            ...response.usuario,
            token: response.token
          }
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.usuarioSubject.next(usuario);
          return usuario;
        })      
      );
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
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

  // getTokenExpirationDate(token: string): Date {
  //   var decoded:any = jwt_decode(token);
  //   if (decoded.exp === undefined) return null;

  //   const date = new Date(0); 
  //   date.setUTCSeconds(decoded.exp);
  //   return date;
  // }

  // isTokenExpired(token?: string): boolean {
  //   if(!token) token = this.getToken();
  //   if(!token) return true;

  //   const date = this.getTokenExpirationDate(token);
  //   if(date === undefined) return false;
  //   return !(date.valueOf() > new Date().valueOf());
  // }

}

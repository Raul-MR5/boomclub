import { Injectable } from '@angular/core';
import { Usuario } from '../../shared/models/usuario.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Page } from 'src/app/shared/models/page';
import { catchError, map } from 'rxjs/operators';
import { RequestFilter } from 'src/app/shared/models/request-filter';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private auth_token: string | undefined;
  private headers;

  constructor(private http: HttpClient, private accountService: AccountService) {
    // if (localStorage.getItem('usuario')) {
      
    // }
  }

  getToken(){
    this.auth_token = this.accountService.getToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    })
  }

  getAll(requestFilter: RequestFilter): Observable<Page<Usuario>> {
    this.getToken();

    var params: HttpParams = new HttpParams();
    params = params.append('page', requestFilter.page.toString());
    params = params.append('size', requestFilter.size.toString());

    requestFilter.sort.forEach(sort => {
      params = params.append('sort', sort.field + ',' + sort.order);
    });

    requestFilter.filter.forEach(f => {
      params = params.append(f.field, f.value);
    });

    return this.http.get<Page<Usuario>>(`${environment.apiUrl}/usuarios`, { params: params, headers: this.headers });
  }

  getOne(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/usuarios/${id}`).pipe(
      catchError(e => {
        if (e.statys != 401 && e.error.mensaje) {
          // this.router.navigate(['/usuarios']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  create(payload: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/usuarios/create`, payload);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario);
  }

  delete(payload: number) {
    console.table(payload);
    return this.http.delete(`${environment.apiUrl}/usuarios/${payload}`);
  }

  count(): Observable<number> {
    return this.http.get<any>(`${environment.apiUrl}/usuarios/count`).pipe(map(result => result.count));
  }

}

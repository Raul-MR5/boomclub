import { Injectable } from '@angular/core';
import { Coche } from '../models/coche.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { environment } from 'src/environments/environment';
import { RequestFilter } from 'src/app/shared/models/request-filter';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CocheService { 
  
  constructor(private http: HttpClient) { 
  }

  getAll(requestFilter: RequestFilter): Observable<Page<Coche>> {
    var params: HttpParams = new HttpParams();
    if(requestFilter){
      params = params.append('page', requestFilter.page.toString());
      params = params.append('size', requestFilter.size.toString());
      
      requestFilter.sort.forEach(sort => {
        params = params.append('sort', sort.field+','+sort.order);
      });
  
      requestFilter.filter.forEach(f => {
          params = params.append(f.field, f.value);
      });
    }
    return this.http.get<Page<Coche>>(`${environment.apiUrl}/coches/lista`, {params: params});
  }

  getOne(id: number): Observable<Coche> {
    return this.http.get<Coche>(`${environment.apiUrl}/coches/lista/${id}`);
  }

  create(payload: Coche): Observable<Coche> {
    return this.http.post<Coche>(`${environment.apiUrl}/coches`, payload);
  }

  update(coche: Coche): Observable<Coche> {
    return this.http.put<Coche>(`${environment.apiUrl}/coches/update/${coche.id}`, coche);
  }

  delete(payload: number) {
    return this.http.delete(`${environment.apiUrl}/coches/${payload}`);
  }

  count(): Observable<number> {
    return this.http.get<any>(`${environment.apiUrl}/coches/count`).pipe(map(result => result.count));
  }
}

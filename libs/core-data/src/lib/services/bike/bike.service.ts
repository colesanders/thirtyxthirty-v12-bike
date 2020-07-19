import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bike } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://thirtyxthirty-lessons.herokuapp.com/bikes';


@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient) { }

  all(): Observable<[Bike]>{
    return this.http.get<[Bike]>(BASE_URL);
  }

  byId(id): Observable<Bike>{
    return this.http.get<Bike>(BASE_URL + '/' + id);
  }

  create(bike: Bike): Observable<Bike>{
    return this.http.post<Bike>(BASE_URL, bike);
  }

  update(bike: Bike): Observable<Bike>{
    return this.http.put<Bike>(BASE_URL + '/' + bike.id, bike);
  }

  delete(id): Observable<Bike>{
    return this.http.delete<Bike>(BASE_URL + '/' + id);
  }
}

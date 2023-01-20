import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NbaApiService {
  constructor(private http: HttpClient) {}

  getPlayer(id: number): Observable<any> {
    return this.http.get(`https://www.balldontlie.io/api/v1/players/${id}`);
  }

  searchPlayer(q: string): Observable<any> {
    return this.http.get(
      `https://www.balldontlie.io/api/v1/players/?search=${q}`
    );
  }
}

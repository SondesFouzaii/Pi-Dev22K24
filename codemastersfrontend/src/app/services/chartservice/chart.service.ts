import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }
  getChartData(): Observable<string> {
    return this.http.get<string>('http://localhost:8089/codemasters/chart/data', { responseType: 'text' as 'json' });
  }
}

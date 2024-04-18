import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8089/codemasters/dashboard';  // Adjust the base URL as needed

    constructor(private http: HttpClient) {}

    getTotalTeams(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/totalTeams`);
    }

    getTotalUsersInTeams(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/totalUsersInTeams`);
    }

    getTotalProjectsInTeams(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/totalProjectsInTeams`);
    }
    getGenderStats(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/genderstats`);
    }
    getRoleCounts(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/role_counts`);
  }
}

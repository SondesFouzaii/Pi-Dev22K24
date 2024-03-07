// team.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = 'http://localhost:8090/codemasters/teams'; // Remplacez par votre URL de base API

  constructor(private http: HttpClient) { }

  retrieveAllTeam(): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieveAllTeam`);
  }

  getTeamById(teamId: number): Observable<any> { 
    return this.http.get(`${this.baseUrl}/retrieveTeam/${teamId}`);
  }

  deleteTeam(teamId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteTeam/${teamId}`);
  }

  updateTeam(teamId: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateTeam/${teamId}`, value, { responseType: 'text' });
  }
  

  addTeam(team: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addTeam`, team);
  }

  addUsersToTeam(teamId: number, userIds: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/addUsersToTeam/${teamId}`, userIds, { responseType: 'text' });
  }


  addProjectsToTeam(teamId: number, projectIds: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/addProjectsToTeam/${teamId}`, projectIds, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    });
  }
  
  searchTeams(searchTerm: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/teams/search?searchTerm=${searchTerm}`);
  }
  
}

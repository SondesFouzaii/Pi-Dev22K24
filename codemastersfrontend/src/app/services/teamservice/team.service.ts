// team.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Team } from 'src/app/models/Team';

export interface TeamStats {
  name: string;
  users: number;
  projects: number;
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = 'http://localhost:8089/codemasters/teams'; 

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
    return this.http.post(`${this.baseUrl}/addTeam`, team, { responseType: 'text' }).pipe(
        catchError(error => {
            console.error('Error while adding team:', error);
            return throwError(() => new Error('Failed to add team'));
        })
    );
}

  addUsersToTeam(teamId: number,  userEmails: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/addUsersToTeam/${teamId}`,  userEmails, { responseType: 'text' });
  }


  addProjectsToTeam(teamId: number, projectNames: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/addProjectsToTeam/${teamId}`, projectNames, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    });
  }
  
  searchTeams(searchTerm: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/searchTeams?query=${searchTerm}`);
  }
  getTeam(page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.http.get(`${this.baseUrl}/teams`, { params: params });
  }
  getTeamsForCalendar(): Observable<{ content: Team[] }> {  // Assuming the response is wrapped in an object with a 'content' property
    return this.http.get<{ content: Team[] }>(`${this.baseUrl}/calendar`);
  }
  getTeamStats(): Observable<TeamStats[]> {
    return this.http.get<TeamStats[]>(`${this.baseUrl}/chart-data`).pipe(
      catchError(error => {
        console.error('Error while fetching team stats:', error);
        return throwError(() => new Error('Failed to fetch team stats'));
      })
    );
  }
}

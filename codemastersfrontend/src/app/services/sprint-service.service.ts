import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sprint, StatSprint } from '../models/sprint';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private apiUrl = 'http://localhost:8089/codemasters/sprint'; 

  constructor(private http: HttpClient) { }

  getSprint(sprintId : number): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.apiUrl}/get-sprint/${sprintId}`);
  }


  getSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.apiUrl}/get-all-sprints`);
  }

  // Nouvelle méthode pour récupérer les tâches par statut
  getSprintsByStatus(status: StatSprint,userstoryId: number): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.apiUrl}/retrieve-sprints-by-status?status=${status}&userstory_id=${userstoryId}`);
  }
  updateSprintStatus(Sprint: Sprint): Observable<Sprint> {
    const url = `${this.apiUrl}/modify-Sprint`;
    return this.http.put<Sprint>(url, Sprint);
  }


  // Fonction pour ajouter une tâche
  addSprint(Sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.apiUrl}/add-sprint`, Sprint);
  }
  modifySprint(Sprint: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.apiUrl}/modify-sprint`, Sprint);
  }


  deleteSprint(SprintId: number): Observable<void> {
    const url = `${this.apiUrl}/delete-sprint/${SprintId}`;
    return this.http.delete<void>(url);
  }


  searchSprintsByTitle(title: string): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.apiUrl}/get-sprints-by-title/${title}`);
  }

  getTasksOfSprint(sprintId : number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/get-tasks-of-sprint/${sprintId}`);
  }

  affectTaskToSprint(sprintId: number, taskId: number) {
    return this.http.put(`${this.apiUrl}/affect-task-to-sprint/${sprintId}/${taskId}`, {});
  }


  removeTaskFromSprint(sprintId: number, taskId: number) {
    return this.http.put(`${this.apiUrl}/remove-task-from-sprint/${sprintId}/${taskId}`, {});
  }

  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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
  addSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.apiUrl}/add-sprint`, sprint).pipe(
      map((response: Sprint) => {
        // Vérifier si la réponse est null
        if (response === null) {
          // Si la réponse est null, afficher un message d'erreur
          console.log("Un sprint existe deja dans cette période");
          // Ou vous pouvez déclencher une erreur et la gérer dans le composant appelant
          throw new Error("Un sprint existe deja dans cette période");
        }
        // Si la réponse n'est pas null, retourner le sprint ajouté
        return response;
      })
    );
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

  sendEmail(sprintTitle: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/envoyer-email/${sprintTitle}`, null);
  }

  
  }

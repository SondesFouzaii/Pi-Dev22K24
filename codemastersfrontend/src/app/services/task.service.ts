import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { TaskStatus } from '../models/task'; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8089/codemasters/task'; 

  constructor(private http: HttpClient) { }


  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/retrieve-all-tasks`);
  }

  // Nouvelle méthode pour récupérer les tâches par statut
  getTasksByStatus(status: TaskStatus,userstoryId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/retrieve-tasks-by-status?status=${status}&userstory_id=${userstoryId}`);
  }
  updateTaskStatus(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/modify-task`;
    return this.http.put<Task>(url, task);
  }


  // Fonction pour ajouter une tâche
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/add-task`, task);
  }
  modifyTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/modify-task`, task);
  }


  deleteTask(taskId: number): Observable<void> {
    const url = `${this.apiUrl}/delete-task/${taskId}`;
    return this.http.delete<void>(url);
  }
}

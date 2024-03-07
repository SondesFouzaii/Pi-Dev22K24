import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8033/project';

  constructor(private http: HttpClient) { }

  retrieveAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/retrieve-all-project`);
  }

  retrieveProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/retrieve-project/${projectId}`);
  }

  // addProject(project: Project): Observable<Project> {
  //   return this.http.post<Project>(`${this.baseUrl}/add-project`, project);
  // }
  addProject(projectData: any, userId: number) {
    return this.http.post<any>('http://localhost:8033/project/add-project?userId=' + userId, projectData);
  }

  modifyProject(projectId: number, updatedProject: Project): Observable<any> {
    // Assurez-vous que votre backend prend en charge la mise à jour d'un projet avec les objets Date
    return this.http.put<any>(`http://localhost:8033/project/modify-project/${projectId}`, updatedProject);
  }
  removeProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-project/${projectId}`);
  }
}
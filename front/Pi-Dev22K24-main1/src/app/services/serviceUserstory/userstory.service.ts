import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Userstory } from 'src/app/models/userstory';

@Injectable({
  providedIn: 'root'
})
export class UserstoryService {
  private baseUrl = 'http://localhost:8033/userStory';

  constructor(private http: HttpClient) { }

  retrieveAlluserstorys(): Observable<Userstory[]> {
    return this.http.get<Userstory[]>(`${this.baseUrl}/retrieve-all-userstory`);
  }

  retrieveuserstory(userstoryId: number): Observable<Userstory> {
    return this.http.get<Userstory>(`${this.baseUrl}/retrieve-UserStory/${userstoryId}`);
  }

  // adduserstory(userstory: userstory): Observable<userstory> {
  //   return this.http.post<userstory>(`${this.baseUrl}/add-userstory`, userstory);
  // }
  // Dans votre service UserstoryService
  adduserstory(userstoryData: any, projectId: number, userId: number) {
    return this.http.post<any>(`http://localhost:8033/userStory/add-user-story-to-project/${projectId}/${userId}`, userstoryData);
  }


 modifyuserstory(userstoryId: number, userstoryData: Userstory): Observable<Userstory> {
      return this.http.put<Userstory>(`http://localhost:8033/userStory/updateUserstory/${userstoryId}`, userstoryData);
  }

  removeuserstory(userstoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-userstory/${userstoryId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting userstory:', error);
          return throwError(error);
        })
      );
  }

}

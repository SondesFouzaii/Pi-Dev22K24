import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //http://localhost:8089/codemasters/user/retrieve-all-users
  private apiServerUrl='http://localhost:8089/codemasters/user';
  constructor(private http:HttpClient) { }

  public getUsers():Observable<User[]>{
    return this.http.get<any>(`${this.apiServerUrl}/retrieve-all-users`);
  } 

  public addUser(user: User):Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/add-user`,user);
  }

  public updateUser(user: User):Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/modify-user`,user);
  }

  public deleteUser(userId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/remove-user/${userId}`);
  }

  
  public bloquage(userId: number):Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/bloquer-debloquer/${userId}`, {});
  }

  public modifierRole(userId: number,role:string):Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/modify-role/${userId}/${role}`, {});
  }
  
  public getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/roles`);
  }
  public getGenders(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/genders`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvancedUser } from 'src/app/models/user+test/addadvenceduser';
import { User } from 'src/app/models/user+test/user';

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

  public getUser(userId: number):Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/retrieve-user/${userId}`);
  } 

    public addSimpleUser(user: User): Observable<string> {
      return this.http.post<string>(`${this.apiServerUrl}/add-simple-user`, user);
    }

    addUser(user: AdvancedUser): Observable<any> {
      return this.http.post<any>(`${this.apiServerUrl}/add-user`, user);
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

  public modifierImage(userId: number,img:string):Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/modify-img/${userId}/${img}`, {});
  }
  
  public getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/roles`);
  }
  public getGenders(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/genders`);
  }

  public restPasswd(mail:string): Observable<string> {
    return this.http.get<string>(`${this.apiServerUrl}/getpassword/${mail}`);
  }
  
}

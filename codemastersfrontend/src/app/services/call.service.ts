import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Callsomeone } from '../models/config';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  private apiServerUrl = 'http://172.16.2.122:8089/codemasters/call';
  //private apiServerUrl = 'http://localhost:8089/codemasters/call';

  constructor(private http: HttpClient) {}

  //callmodule
  public makeACall(call: Callsomeone): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/make-call`, call);
  }
  public isSomeoneCallingMe(myid:number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/isSomeoneCallingMe/${myid}`, {});
  }
  public whoIsCallingMe(myid:number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/whoIsCallingMe/${myid}`, {});
  }
  public pickUpThePhone( ): Observable<void> {
    return this.http.get<void>(`${this.apiServerUrl}/pickUpThePhone`, {});
  } 
  public getMyCallHistory(iduser: number): Observable<Callsomeone[]> {
    return this.http.get<Callsomeone[]>(`${this.apiServerUrl}/getMyCallHistory/${iduser}`, {});
  } 

  
}

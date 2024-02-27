import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private url: String = 'http://localhost:8089/codemasters/session';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  

  constructor(private http: HttpClient) { }

  getAllSessions(): Observable<any> {
    return this.http.get(this.url + '/find-all-sessions');
  }

  addSession(session:Session,idProject: number, idCard: number): Observable<string> {
    return this.http.post<string>(this.url + '/add-session/' + idProject + '/' + idCard, session);
  }

  deleteSession(sess:Session):Observable<Session>{
    return this.http.delete<Session>(this.url+'/deleteRes/'+sess.id );
  }
}

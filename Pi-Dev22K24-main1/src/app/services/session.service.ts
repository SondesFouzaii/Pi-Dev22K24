import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private url: String = 'http://localhost:8089/codemasters/session';
  private urlCard: String = 'http://localhost:8089/codemasters/card';
  //http://localhost:8089/codemasters/session/remove-session/{{session-id}}
  //http://localhost:8089/codemasters/session/update-sessions/{{idsession}}/{{idproject}}/{{idcard}}
  //http://localhost:8089/codemasters/session/find-session-by-id/{{sessionId}}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  

  constructor(private http: HttpClient) { }
  getAllCards(): Observable<any> {
    return this.http.get(this.urlCard + '/findAllCards');
  }

  getAllSessions(): Observable<any> {
    return this.http.get(this.url + '/find-all-sessions');
  }

  // addSession(session:Session,idProject: number, idCard: number): Observable<string> {
  //   return this.http.post<string>(this.url + '/add-session/' + idProject + '/' + idCard, session);
  // }
  addSession(session:any,idProject: number, idCard: number): Observable<Session> {
    return this.http.post<Session>(this.url + '/add-session/' + idProject + '/' + idCard, session);
  }

  deleteSession(sess:Session):Observable<Session>{
    return this.http.delete<Session>(this.url+'/remove-session/'+sess.id );
  }



  updateSession(session: Session): Observable<Session> {
    return this.http.put<Session>(this.url+'/update-sessions', session);
  }

   getSessionById(id: any) {
    return this.http.get(this.url+'/find-session-by-id/' + id);
   }

   //remove-session/{{session-id}
   deleteSess(sessionId: number): Observable<void> {
    const url = `${this.url}/remove-session/${sessionId}`;
    return this.http.delete<void>(url);
  }
}

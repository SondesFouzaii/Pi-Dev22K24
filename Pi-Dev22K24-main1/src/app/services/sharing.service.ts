import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private sessionDataSubject = new BehaviorSubject<any>(null);
  private allSession = new BehaviorSubject<any>(null);
  sessionData$: Observable<any> = this.sessionDataSubject.asObservable();
  allSessions$: Observable<any> = this.allSession.asObservable();

  constructor() {}

  setSessionData(data: any) {
    this.sessionDataSubject.next(data);
  }

  getSessionData(): Observable<any> {
    return this.sessionData$;
  }
  setAllSessions(data: any) {
    this.allSession.next(data);
  }

  getAllSessions(): Observable<any> {
    return this.allSessions$;
  }
}

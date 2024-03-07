
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { Session } from '../models/session';
import { Task } from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:8089/codemasters/card'; 

  
  addCardvalueToTask(cardValue: number, taskId: number){
    return this.http.put(`${this.apiUrl}/showcard/${cardValue}/${taskId}`,{});
  }



  constructor(private http: HttpClient ) {}
  getsession(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrl}/get-all-session`);
  }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/retrieve-all-tasks`);
  }
  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/get-all-Cards`);
  }

  getCard(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/get-all-Card`);
  }

  addCard(Card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/add-Card`, Card);
  }
  modifyCard(Card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/modify-Card`, Card);
  }
 

  deleteCard(CardId: number): Observable<void> {
    const url = `${this.apiUrl}/delete-Card/${CardId}`;
    return this.http.delete<void>(url);
  }
  searchCardsByTitle(title: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/get-Cards-by-title/${title}`);
  }
}

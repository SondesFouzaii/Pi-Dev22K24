import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8089/codemasters/notifications';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }


  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}`);
  }

  addNotification(item: Notification, userId: number): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrl}/${userId}/sendNotification`, item);
  }

  markAsReadNotification(id: number): Observable<String> {
    return this.http.put<string>(`${this.apiUrl}/${id}/markAsRead`,{});
  }

  removeNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}

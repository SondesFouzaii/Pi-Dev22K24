import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from '../models/test';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiServerUrl='http://localhost:8089/codemasters/quiz';
  constructor(private http:HttpClient,private router: Router) { }

  public getTests():Observable<Test[]>{
    return this.http.get<any>(`${this.apiServerUrl}/retrieve-all-tests`);
  } 

  public getatest(id: number):Observable<Test>{
    return this.http.get<Test>(`${this.apiServerUrl}/retrieve-test/${id}`);
  } 

  addQuiz(quiz: Quiz): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/add-quiz`, quiz);
  }

  public activateanactivate(userId: number):Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/activateanactivate/${userId}`, {});
  }
  
}

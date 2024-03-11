import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from '../models/test';
import { Observable } from 'rxjs';

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

}

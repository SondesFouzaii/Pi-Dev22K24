import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  
  private apiServerUrl='http://localhost:8089/codemasters/user';
  constructor(private http:HttpClient) { }
  
}

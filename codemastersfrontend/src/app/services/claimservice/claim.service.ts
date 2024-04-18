import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from 'src/app/models/claim'; // Assurez-vous d'avoir un modèle Claim correspondant
import { User } from 'src/app/models/user';
import { Userstory } from 'src/app/models/userstory';
@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private baseUrl = 'http://localhost:8089/codemasters/claims'; // URL de base de l'API

  constructor(private http: HttpClient) { }

  retrieveAllClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.baseUrl}/retrieveAllClaims`);
  }

  getClaimById(id: number): Observable<any> {
    // Ajout du segment "retrieveClaims" dans le chemin
    return this.http.get(`${this.baseUrl}/retrieveClaims/${id}`);
  }

  deleteClaim(claimId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteClaim/${claimId}`);
  }

  createClaim(claim: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createClaim`, claim);
}
  


updateClaim(id: number, claim: any): Observable<any> {
  // Ensure this path matches the one in your Spring Boot controller
  return this.http.put(`${this.baseUrl}/claims/update/${id}`, claim);
}
searchClaims(searchTerm: string): Observable<Claim[]> {
  return this.http.get<Claim[]>(`${this.baseUrl}/search`, { params: { searchTerm } });
}
getClaims(page: number, size: number): Observable<any> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  return this.http.get(`${this.baseUrl}/claims`, { params: params });
}

}

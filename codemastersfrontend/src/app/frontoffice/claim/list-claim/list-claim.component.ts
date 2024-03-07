import { Component } from '@angular/core';
import { Claim } from 'src/app/models/claim';
import { ClaimService } from 'src/app/services/claimservice/claim.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-claim',
  templateUrl: './list-claim.component.html',
  styleUrls: ['./list-claim.component.scss']
})
export class ListClaimComponent {
  claims: Claim[] = [];
  currentPage: number = 0;
  pageSize: number = 4;
  totalElements: number = 0;
  totalPages: number=0;

  constructor(private claimService: ClaimService, private router: Router) { }

  ngOnInit(): void {
    
    this.loadClaims();
  }

  retrieveAllClaims(): void {
    this.claimService.retrieveAllClaims().subscribe({
      next: (data) => {
        this.claims = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des réclamations', error);
      }
    });
  }

  // Méthodes pour naviguer vers l'ajout ou l'édition de réclamations
  addClaim(): void {
    this.router.navigate(['/front-add-claim']); // Mettez à jour avec le bon chemin
  }

  editClaim(claimId: number): void {
    this.router.navigate([`/front-update-claim/${claimId}`]); // Mettez à jour avec le bon chemin
  }
  show(claimId: number): void {
    this.router.navigate([`/retrieveClaims/${claimId}`]); // Mettez à jour avec le bon chemin
  }

  deleteClaim(claimId: number): void {
    this.claimService.deleteClaim(claimId).subscribe(() => {
      this.retrieveAllClaims(); // Rafraîchir la liste après la suppression
    }, error => {
      console.error('Erreur lors de la suppression de la réclamation', error);
    });
  }
  searchTerm: string = '';
  searchClaims(): void {
    this.claimService.searchClaims(this.searchTerm).subscribe(data => {
      this.claims = data;
    }, error => {
      console.log(error);
    });
  }
  sortOrder: boolean = true; // true pour tri croissant, false pour tri décroissant

  sortClaimsByTitle() {
    this.claims.sort((a, b) => {
      return this.sortOrder ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });
    this.sortOrder = !this.sortOrder; // Inverse l'ordre pour le prochain tri
  }
  loadClaims() {
    this.claimService.getClaims(this.currentPage, this.pageSize).subscribe(data => {
      this.claims = data['content'];
      this.totalElements = data['totalElements'];
      this.totalPages = Math.ceil(this.totalElements / this.pageSize);
    });
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize >= this.totalElements) return;
    this.currentPage++;
    this.loadClaims();
  }

  previousPage() {
    if (this.currentPage === 0) return;
    this.currentPage--;
    this.loadClaims();
  }

}

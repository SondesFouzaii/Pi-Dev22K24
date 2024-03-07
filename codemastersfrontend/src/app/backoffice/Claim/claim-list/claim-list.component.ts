import { Component } from '@angular/core';
import { Claim } from 'src/app/models/claim';
import { ClaimService } from 'src/app/services/claimservice/claim.service';
import { Router } from '@angular/router';
import { PdfExportService } from 'src/app/services/pdf.export.service';
@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss']
})
export class ClaimListComponent {
  claims: Claim[] = [];

  constructor(private claimService: ClaimService, private router: Router, private pdfExportService: PdfExportService) { }

  ngOnInit(): void {
    this.retrieveAllClaims();
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
    this.router.navigate(['/back-add-claim']); // Mettez à jour avec le bon chemin
  }

  editClaim(claimId: number): void {
    this.router.navigate([`/back-update-claim/${claimId}`]); // Mettez à jour avec le bon chemin
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
  exportClaimsToPdf(): void {
    this.pdfExportService.exportClaimsToPdf(this.claims);
  }

}

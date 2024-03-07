import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimService } from 'src/app/services/claimservice/claim.service';
@Component({
  selector: 'app-claim-update',
  templateUrl: './claim-update.component.html',
  styleUrls: ['./claim-update.component.scss']
})
export class ClaimUpdateComponent {
  claim: any = {};

  constructor(
    private claimService: ClaimService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  id!: number;
  claimData: any = {};

  

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.claimService.getClaimById(this.id).subscribe((data: any) => {
      this.claimData = data;
    });
  }
  onSubmit(): void {
    this.claimService.updateClaim(this.id, this.claimData).subscribe({
      next: () => {
        // Navigation après la mise à jour réussie, par exemple retour à la liste des réclamations
        this.router.navigate(['/front-show-claim']);
      },
      error: (e) => console.error(e)
    });
  }
}

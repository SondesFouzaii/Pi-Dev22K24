import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimService } from 'src/app/services/claimservice/claim.service';

@Component({
  selector: 'app-claim-add',
  templateUrl: './claim-add.component.html',
  styleUrls: ['./claim-add.component.scss']
})
export class ClaimAddComponent {
  claim = {
    user: {
      name: '' // User's name
    },
    userstory: {
      name: '' // UserStory's name
    },
    title: '',
    content: ''
  };

  constructor(private claimService: ClaimService,
    
    private router: Router) { }

  submitClaim(): void {
    this.claimService.createClaim(this.claim).subscribe({
      next: (response) => {
        console.log(response);
        alert(response.message); // Adjusted to access the message property
        this.router.navigate(['/front-show-claim']);
      },
      error: (error) => {
        console.error('There was an error!', error);
        alert('Failed to add claim');
      }
    });
}
}

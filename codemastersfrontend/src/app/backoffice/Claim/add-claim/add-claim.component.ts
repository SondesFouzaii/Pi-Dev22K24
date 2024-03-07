import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimService } from 'src/app/services/claimservice/claim.service';

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.scss']
})
export class AddClaimComponent {
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
  

  constructor(private claimService: ClaimService,private router: Router) { }

  submitClaim(): void {
    this.claimService.createClaim(this.claim).subscribe({
      next: (response) => {
        console.log(response);
        alert(response.message); // Adjusted to access the message property
        this.router.navigate(['/back-show-claim']); 
      },
      error: (error) => {
        console.error('There was an error!', error);
        alert('Failed to add claim');
      }
    });
}
}

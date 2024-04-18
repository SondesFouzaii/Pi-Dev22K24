import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/teamservice/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent {
  teamForm = this.fb.group({
    name: ['', Validators.required],
    userEmails: [''],  // Using a string for emails
    projectNames: [''],  // Using a string for project names
  });

  constructor(private fb: FormBuilder, private teamService: TeamService, private router: Router) { }

  addTeam(): void {
    if (this.teamForm.valid) {
      const formValue = this.teamForm.value;
  
      // Ensure the values are strings and default to an empty string if null or undefined
      const userEmails = formValue.userEmails ?? '';
      const projectNames = formValue.projectNames ?? '';

      const teamData = {
        teamName: formValue.name,
        userEmails: userEmails.split(',').map(email => email.trim()).filter(email => email),  // Split, trim and remove empty entries
        projectNames: projectNames.split(',').map(name => name.trim()).filter(name => name),  // Split, trim and remove empty entries
      };
  
      this.teamService.addTeam(teamData).subscribe({
        next: (team) => {
          console.log('Équipe ajoutée avec succès', team);
          this.router.navigate(['/back-show-team']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de l\'équipe', error);
        }
      });
    }
  }
}

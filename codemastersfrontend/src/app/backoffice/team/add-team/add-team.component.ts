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
    userIds: [''], // Modifiez pour utiliser une chaîne
    projectIds: [''], // Modifiez pour utiliser une chaîne
  });
  

  constructor(private fb: FormBuilder, private teamService: TeamService,private router: Router) { }

  addTeam(): void {
    if (this.teamForm.valid) {
      const formValue = this.teamForm.value;
  
      const userIdsString = formValue.userIds ?? '';
      const projectIdsString = formValue.projectIds ?? '';
  
      const teamData = {
        teamName: formValue.name, // Modification ici de 'name' à 'teamName'
        userIds: userIdsString.split(',')
                    .map(s => parseInt(s.trim(), 10))
                    .filter(n => !isNaN(n)),
        projectIds: projectIdsString.split(',')
                      .map(s => parseInt(s.trim(), 10))
                      .filter(n => !isNaN(n)),
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

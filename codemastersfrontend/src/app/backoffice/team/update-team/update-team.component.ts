import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TeamService } from 'src/app/services/teamservice/team.service'; // Update the path as necessary
import { User } from 'src/app/models/user';
import { Project } from 'src/app/models/project';
@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit {
  teamForm: FormGroup;
  teamId!: number; // Correctly typed as number
  teamUsers: User[] = []; // Ajoutez cette ligne
  teamProjects: Project[] = []; // Ajoutez cette ligne
  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.teamForm = this.fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.teamId = +params['id']; // The '+' ensures the parameter is treated as a number
      if (this.teamId) {
        this.loadTeamData(this.teamId);
      } else {
        console.error('Team ID is undefined');
        // Optionally navigate away or show an error
      }
    });
  }

  loadTeamData(teamId: number) {
    this.teamService.getTeamById(teamId).subscribe(team => {
      this.teamForm.patchValue({
        name: team.name,
      });
      this.teamUsers = team.users; // Assurez-vous que votre API renvoie ces données
      this.teamProjects = team.projects;
    }, error => console.error('Error loading team data', error));
  }
  openAddUsers() {
    // Example of routing
    this.router.navigate(['/back-add-users-to-team', this.teamId]);

  }
  openAddProjects() {
    // Example of routing
    this.router.navigate(['/back-add-projects-to-team', this.teamId]);

  }
  onSubmit() {
    if (this.teamForm.valid) {
      this.teamService.updateTeam(this.teamId, this.teamForm.value).subscribe(
        () => {
          console.log('Team updated successfully');
          this.router.navigate(['/back-show-team']); // Update with your actual route
        },
        error => console.error('Error updating team', error)
      );
    }
  }
}

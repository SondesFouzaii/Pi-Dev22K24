import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/teamservice/team.service';

@Component({
  selector: 'app-add-projects-to-team',
  templateUrl: './add-projects-to-team.component.html',
  styleUrls: ['./add-projects-to-team.component.scss']
})
export class AddProjectsToTeamComponent implements OnInit {
  projectIDsInput = new FormControl('');
  teamId!: number;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];
    });
  }

  addProjects(): void {
    const userInput = this.projectIDsInput.value || '';
    const projectIdsArray = userInput.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id));
    if (projectIdsArray.length > 0) {
      // Ensure we're sending a proper JSON object if that's what the backend expects
      this.teamService.addProjectsToTeam(this.teamId, projectIdsArray).subscribe(
        () => {
          console.log('Projects added successfully');
          this.router.navigate(['/back-update-team', this.teamId]);
        },
        error => console.error('Failed to add projects', error)
      );
    } else {
      console.error('Input contains non-numeric values or no values were entered');
    }
  }
  
}

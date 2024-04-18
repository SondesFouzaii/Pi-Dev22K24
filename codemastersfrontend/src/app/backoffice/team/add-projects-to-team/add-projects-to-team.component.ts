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
  projectNamesInput = new FormControl('');
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
    const projectNames = this.projectNamesInput.value || '';
    const projectNamesArray = projectNames.split(',').map(name => name.trim()).filter(name => name !== '');
    if (projectNamesArray.length > 0) {
      this.teamService.addProjectsToTeam(this.teamId, projectNamesArray).subscribe(
        () => {
          console.log('Projects added successfully');
          this.router.navigate(['/back-update-team', this.teamId]);
        },
        error => console.error('Failed to add projects', error)
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { TeamService } from 'src/app/services/teamservice/team.service';
import { Team } from 'src/app/models/Team';  // Assuming Team is a proper TypeScript class

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: Team | null = null;  // Change to use a single Team object, initialized to null
  teamId!: number;
  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute  // Inject ActivatedRoute to access route parameters
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('teamId'); // id is string | null
      if (id) {
        this.teamId = +id; // Convert string to number using the unary plus operator
        this.getTeamById(this.teamId);
      } else {
        console.error('Team ID is not available');
        // Handle the absence of teamId appropriately
      }
    });
  }
  getTeamById(teamId: number) {
    this.teamService.getTeamById(teamId).subscribe({
      next: (data) => {
        this.team = data;  // Assume data is properly typed as Team
        console.log(this.team); // Log to see if projects are included and correctly named

      },
      error: (error) => {
        console.error('Error retrieving the team', error);
      }
    });
  }
}

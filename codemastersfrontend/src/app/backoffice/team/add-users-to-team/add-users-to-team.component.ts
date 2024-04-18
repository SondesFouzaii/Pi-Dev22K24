import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/teamservice/team.service';

@Component({
  selector: 'app-add-users-to-team',
  templateUrl: './add-users-to-team.component.html',
  styleUrls: ['./add-users-to-team.component.scss']
})
export class AddUsersToTeamComponent implements OnInit {
  userEmailsInput = new FormControl(''); // Changed to accept user emails
  teamId!: number;
  teams: any[] = [];

  constructor(private teamService: TeamService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['teamId']; // Ensure that 'teamId' is correctly interpreted as a number
    });
    this.retrieveAllTeams(); // Retrieve all teams when the component initializes
  }

  retrieveAllTeams(): void {
    this.teamService.retrieveAllTeam().subscribe({
      next: (data) => {
        this.teams = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des équipes', error);
      }
    });
  }

  addUsers(): void {
    const userEmails = this.userEmailsInput.value || '';
    const userEmailsArray = userEmails.split(',').map(email => email.trim());
    if (userEmailsArray.length > 0) {
      this.teamService.addUsersToTeam(this.teamId, userEmailsArray).subscribe({
        next: () => {
          console.log('Users added successfully');
          this.router.navigate(['/back-update-team', this.teamId]);
        },
        error: (error) => {
          console.error('Failed to add users', error);
        }
      });
    }
  }

}

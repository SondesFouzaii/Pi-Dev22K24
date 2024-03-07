import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/teamservice/team.service'; 
import { Router } from '@angular/router';
import { Team } from 'src/app/models/Team';
@Component({
  selector: 'app-add-users-to-team',
  templateUrl: './add-users-to-team.component.html',
  styleUrls: ['./add-users-to-team.component.scss']
})
export class AddUsersToTeamComponent implements OnInit {
  userIDsInput = new FormControl(''); // Changed to accept string input
  teamId!: number;

  constructor(private teamService: TeamService, private route: ActivatedRoute,
    private router: Router ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['teamId'];
    });
  }

  addUsers(): void {
    const userInput = this.userIDsInput.value || ''; // Get user input from the FormControl
    const userIdsArray = userInput.split(',').map(id => +id.trim()); // Convert string to array of numbers
    if (userIdsArray.length > 0) {
      this.teamService.addUsersToTeam(this.teamId, Array.from(userIdsArray)) // Convert Set to array
  .subscribe(
    () => {
      console.log('Users added successfully');
      this.router.navigate(['/back-update-team', this.teamId]);
    },
    error => console.error('Failed to add users', error)
  );

    } 
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { TeamService } from 'src/app/services/teamservice/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams: any[] = [];

  constructor(private teamService: TeamService, private router: Router) { } // Injectez Router

  ngOnInit(): void {
    this.retrieveAllTeams();
  }
  searchTerm: string = '';




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

  // Méthode pour naviguer vers la page de création d'équipe
  navigateToCreateTeam(): void {
    this.router.navigate(['/back-add-team']); // Assurez-vous que le chemin est correct
  }
  navigateToUpdateTeam(teamId: number) {
    this.router.navigate(['/back-update-team', teamId]);}

    deleteTeam(teamId: number): void {
      this.teamService.deleteTeam(teamId).subscribe(() => {
        this.retrieveAllTeams(); 
      }, error => {
        console.error('Erreur lors de la suppression de la réclamation', error);
      });
    }
    searchTeams() {
      if (this.searchTerm.length > 1) { // Optional: Start search after 2 characters
        this.teamService.searchTeams(this.searchTerm).subscribe(data => {
          this.teams = data;
        });
      }
    }
    
}

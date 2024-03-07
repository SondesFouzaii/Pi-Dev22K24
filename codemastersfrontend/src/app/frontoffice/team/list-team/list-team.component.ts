import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { TeamService } from 'src/app/services/teamservice/team.service';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss']
})
export class ListTeamComponent {
  teams: any[] = [];

  constructor(private teamService: TeamService, private router: Router) { } // Injectez Router

  ngOnInit(): void {
    this.retrieveAllTeams();
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

  // Méthode pour naviguer vers la page de création d'équipe
  navigateToCreateTeam(): void {
    this.router.navigate(['/front-add-team']); // Assurez-vous que le chemin est correct
  }
  navigateToUpdateTeam(teamId: number) {
    this.router.navigate(['/front-update-team', teamId]);}
    deleteTeam(teamId: number): void {
      this.teamService.deleteTeam(teamId).subscribe(() => {
        this.retrieveAllTeams(); // Rafraîchir la liste après la suppression
      }, error => {
        console.error('Erreur lors de la suppression de la réclamation', error);
      });
    }
}

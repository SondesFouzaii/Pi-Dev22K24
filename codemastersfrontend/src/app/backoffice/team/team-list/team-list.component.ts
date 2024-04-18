import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { TeamService } from 'src/app/services/teamservice/team.service';

import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfExportService } from 'src/app/services/pdf.export.service';
@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  teams: any[] = [];
  selectedTeamId: number | null = null; // ID de l'équipe sélectionnée pour l'ajout d'utilisateurs
  userIdsToAdd: string[] = []; 
  projectsIdsToAdd: string[] = []; 
  services: any;
  currentPage: number = 0;
  pageSize: number = 4;
  totalElements: number = 0;
  totalPages: number=0;

  constructor(
    private teamService: TeamService, 
    private router: Router,
    private pdfExportService: PdfExportService, 
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) { }
  
  ngOnInit(): void {
    this.loadTeams();
  }
  searchTerm: string = '';
  toggleAddUserRow(team: any): void {
    team.showAddUser = !team.showAddUser; // Cette propriété contrôle l'affichage du champ d'ajout
    if (!team.showAddUser) {
      team.newUserIds = ''; // Réinitialiser quand on cache le champ
    }
  }
  toggleAddProjectRow(team: any): void {
    team.showAddProject = !team.showAddProject; // Cette propriété contrôle l'affichage du champ d'ajout
    if (!team.showAddProject) {
      team.newProjectIds = ''; // Réinitialiser quand on cache le champ
    }
  }
  // TypeScript Component Code
addUsers(teamId: number, userEmails: string, team: any): void {
  const userEmailsArray = userEmails.split(',').map(email => email.trim()).filter(email => email);
  if (userEmailsArray.length > 0) {
      this.teamService.addUsersToTeam(teamId, userEmailsArray)
          .subscribe({
              next: () => {
                  console.log('Users added successfully');
                  this.retrieveAllTeams(); // Refresh the team list
                  team.showAddUser = false; // Hide the add user row on successful addition
                  team.newUserEmails = ''; // Clear the input field after successful addition
              },
              error: (error) => {
                  console.error('Error adding users', error);
                  team.showAddUser = false; // Optionally hide the add row on error
                  team.newUserEmails = ''; // Clear the input field in case of an error
              }
          });
  } else {
      // If no valid emails are provided, reset the interface without making a server call
      team.showAddUser = false;
      team.newUserEmails = ''; // Clear the input field
  }
}


  // Assuming you have a method like addProjects similar to what you described:
addProjects(teamId: number, projectNames: string, team: any): void {
  const projectNamesArray = projectNames.split(',').map(name => name.trim()).filter(name => name !== '');
  if (projectNamesArray.length > 0) {
    this.teamService.addProjectsToTeam(teamId, projectNamesArray)
      .subscribe(() => {
        console.log('Projects added successfully');
        this.retrieveAllTeams(); 
        team.showAddProject = false; // Hide the add project row
      }, error => {
        console.error('Failed to add projects', error);
        team.showAddProject = false;
      });
      
  } else {
    console.log('No valid project names entered');
    team.showAddProject = false;
    this.toastr.error('Failed to add team', 'Error!', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
  }
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
    this.router.navigate(['/back-add-team']); // Assurez-vous que le chemin est correct
  }
  navigateToUpdateTeam(teamId: number) {
    this.router.navigate(['/back-update-team', teamId]);}

    deleteTeam(teamId: number): void {
      this.teamService.deleteTeam(teamId).subscribe({
        next: () => {
          this.retrieveAllTeams(); // Rafraîchir la liste après une suppression réussie
          this.toastr.success('Team deleted successfully', 'Success!', {
            timeOut: 5000,
            positionClass: 'toast-top-right'
          });
        },
        error: error => {
          console.error('Error during team deletion', error);
          this.toastr.error('Failed to delete team', 'Error!', {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          });
        }
      });
    }
    
    searchTeams() {
      this.teamService.searchTeams(this.searchTerm).subscribe(data => {
        this.teams = data;
      }, error => {
        console.log(error);
      });
    }
    
    exportTeamsToPDFs(): void {
      this.teams.forEach(team => {
        this.pdfExportService.generatePdfForTeam(team); // Utilisez la bonne référence de service ici
      });
    }
    sortOrder: boolean = true; // true pour tri croissant, false pour tri décroissant

  sortTeamsByTitle() {
    this.teams.sort((a, b) => {
      return this.sortOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
    this.sortOrder = !this.sortOrder; // Inverse l'ordre pour le prochain tri
  }
  loadTeams() {
    this.teamService.getTeam(this.currentPage, this.pageSize).subscribe(data => {
      this.teams = data['content'];
      this.totalElements = data['totalElements'];
      this.totalPages = Math.ceil(this.totalElements / this.pageSize);
    });
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize >= this.totalElements) return;
    this.currentPage++;
    this.loadTeams();
  }

  previousPage() {
    if (this.currentPage === 0) return;
    this.currentPage--;
    this.loadTeams();
  }

    
    
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/serviceProjet/project.service';
import * as QRCode from 'qrcode';
@Component({
  selector: 'app-list-project-front',
  templateUrl: './list-project-front.component.html',
  styleUrls: ['./list-project-front.component.scss']
})
export class ListProjectFrontComponent {
  projects: Project[] = [];
  searchTerm: string = '';
  qrCodeUrls: { [id: number]: string } = {}; 

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.getProjectsAndGenerateQRCode();
  }

  async getProjectsAndGenerateQRCode(): Promise<void> {
    try {
      const projects = await this.projectService.retrieveAllProjects().toPromise();
      if (projects) {
        this.projects = projects;
        await this.generateQRCodeForProjects();
      } else {
        console.error('No projects found');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  async generateQRCodeForProjects(): Promise<void> {
    for (const proj of this.projects) {
      const detailsDoc = {
        id: proj.id,
        name: proj.name,
        creationdate: proj.creationdate,
        deadline: proj.deadline,
      };

      try {
        const url = await QRCode.toDataURL(JSON.stringify(detailsDoc));
        this.qrCodeUrls[proj.id] = url; // Stocker l'URL du code QR associé à l'ID du document
      } catch (err) {
        console.error('Erreur lors de la génération du QR Code pour le projet', proj.id, ':', err);
      }
    }
  }

  delete(project: Project) {
    this.projectService.removeProject(project.id).subscribe(() => {
      this.projects = this.projects.filter((f: Project) => f.id !== project.id);
    });
    this.router.navigate(['/listProjectFront']);
  }

  update(id: any) {
    this.router.navigate(['/editProjectFront', id]);
  }

  details(id: any) {
    this.router.navigate(['/detailProjectFront', id]);
  }

  //recherche
  get filteProjects() {
    return this.projects.filter(
      (proj: Project) =>
      proj.id.toString().includes(this.searchTerm) ||
      proj.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      proj.deadline.toString().includes(this.searchTerm) ||
      proj.creationdate.toString().includes(this.searchTerm)
    );
  }
}

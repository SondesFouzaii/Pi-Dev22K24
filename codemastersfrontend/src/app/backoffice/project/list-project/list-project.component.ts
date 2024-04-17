// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { Project } from 'src/app/models/project';
// import { ProjectService } from 'src/app/services/serviceProjet/project.service';
// import * as QRCode from 'qrcode';

// @Component({
//   selector: 'app-list-project',
//   templateUrl: './list-project.component.html',
//   styleUrls: ['./list-project.component.scss']
// })
// export class ListProjectComponent {
//   projects: Project[] = [];
//   searchTerm: string = '';
//   qrCodeUrls: { [id: number]: string } = {};

//   constructor(private projectService: ProjectService, private router: Router) { }

//   ngOnInit(): void {
//     this.getProjectsAndGenerateQRCode();
//   }

//   async getProjectsAndGenerateQRCode(): Promise<void> {
//     try {
//       const projects = await this.projectService.retrieveAllProjects().toPromise();
//       if (projects) {
//         this.projects = projects;
//         await this.generateQRCodeForProjects();
//       } else {
//         console.error('No projects found');
//       }
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   }

//   async generateQRCodeForProjects(): Promise<void> {
//     for (const proj of this.projects) {
//       const detailsDoc = {
//         id: proj.id,
//         name: proj.name,
//         creationdate: proj.creationdate,
//         deadline: proj.deadline,
//       };

//       try {
//         const url = await QRCode.toDataURL(JSON.stringify(detailsDoc));
//         this.qrCodeUrls[proj.id] = url; // Stocker l'URL du code QR associé à l'ID du document
//       } catch (err) {
//         console.error('Erreur lors de la génération du QR Code pour le projet', proj.id, ':', err);
//       }
//     }
//   }

//   delete(project: Project) {
//     this.projectService.removeProject(project.id).subscribe(() => {
//       this.projects = this.projects.filter((f: Project) => f.id !== project.id);
//     });
//   }

//   update(id: any) {
//     this.router.navigate(['/editProject', id]);
//   }

//   details(id: any) {
//     this.router.navigate(['/detailProject', id]);
//   }

//   //recherche
//   get filteProjects() {
//     return this.projects.filter(
//       (proj: Project) =>
//       proj.id.toString().includes(this.searchTerm) ||
//       proj.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       proj.deadline.toString().includes(this.searchTerm) ||
//       proj.creationdate.toString().includes(this.searchTerm)
//     );
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/serviceProjet/project.service';
import * as QRCode from 'qrcode';
import { ToastrService } from 'ngx-toastr'; // Importer ToastrService

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent {
  projects: Project[] = [];
  searchTerm: string = '';
  
  qrCodeUrls: { [id: number]: string } = {};

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private toastr: ToastrService // Injecter ToastrService
  ) { }

  ngOnInit(): void {
    this.getProjectsAndGenerateQRCode();
  }

  async getProjectsAndGenerateQRCode(): Promise<void> {
    try {
      const projects = await this.projectService.retrieveAllProjects().toPromise();
      if (projects) {
        this.projects = projects;
        await this.generateQRCodeForProjects();
        this.checkDeadline(); // Appeler la fonction pour vérifier la deadline après avoir récupéré les projets
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
  }

  update(id: any) {
    this.router.navigate(['/editProject', id]);
  }

  details(id: any) {
    this.router.navigate(['/detailProject', id]);
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



  checkDeadline() {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    this.projects.forEach(proj => {
      const deadline = new Date(proj.deadline);
      const deadlineYear = deadline.getFullYear();
      const deadlineMonth = deadline.getMonth();
      const deadlineDay = deadline.getDate();

      if (
        deadlineYear === todayYear &&
        deadlineMonth === todayMonth &&
        deadlineDay === todayDay
      ) {
        console.log(`The deadline for project ${proj.name} is today!`);
        this.toastr.error(`The deadline for project  ${proj.name} is today!`);
      }
    });
  }

}

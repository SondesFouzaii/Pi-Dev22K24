
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/serviceProjet/project.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-edit-project-front',
  templateUrl: './edit-project-front.component.html',
  styleUrls: ['./edit-project-front.component.scss']
})
export class EditProjectFrontComponent implements OnInit {
  projectToUpdate!: Project;

  constructor(
    private projectService: ProjectService,
    private ac: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.ac.paramMap.subscribe(next => {
      const id = Number(next.get('id'));
      this.projectService.retrieveProject(id).subscribe(
        res => {
          this.projectToUpdate = res;
          // Convertir les chaînes de caractères en objets Date
          this.projectToUpdate.creationdate = new Date(this.projectToUpdate.creationdate);
          this.projectToUpdate.deadline = new Date(this.projectToUpdate.deadline);
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  update() {
    const updatedProject: Project = {
      ...this.projectToUpdate
    };
  
    this.projectService.modifyProject(this.projectToUpdate.id, updatedProject).subscribe(
      () => {
        console.log('Project successfully modified');
        this.router.navigate(['/listProjectFront']);
      },
      error => {
        console.error('Error updating project:', error);
      }
    );
    this.router.navigate(['/listProjectFront']);
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}



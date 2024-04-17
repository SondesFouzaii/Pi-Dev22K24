import { Project } from './../../../models/project';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/houssem/user.service';
import { ProjectService } from 'src/app/services/serviceProjet/project.service';
import { UserstoryService } from 'src/app/services/serviceUserstory/userstory.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-userstory-front',
  templateUrl: './add-userstory-front.component.html',
  styleUrls: ['./add-userstory-front.component.scss']
})
export class AddUserstoryFrontComponent implements OnInit {
  userStoryForm!: FormGroup;
  projects: any[] = [];
  users: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userStoryService: UserstoryService ,
    private userService : UserService,
    private projectService : ProjectService ,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.userStoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      estimation: ['', Validators.required],
      project: ['', Validators.required],
      User: ['', Validators.required]
    });

    // Charger les projets et les utilisateurs lors de l'initialisation du composant
    this.loadProjects();
    this.loadUsers();
  }

  // Méthode pour charger la liste des projets depuis le service
  loadProjects() {
    this.projectService.retrieveAllProjects().subscribe(
      projects => {
        this.projects = projects;
      },
      error => {
        console.error('Error loading projects:', error);
      }
    );
  }

  // Méthode pour charger la liste des utilisateurs depuis le service
  loadUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

onSubmit() {
  if (this.userStoryForm.valid) {
    const userStoryData = this.userStoryForm.value;
    const project = userStoryData.project;
    const User = userStoryData.User;
    
    // Appeler la méthode du service pour ajouter l'histoire utilisateur
    this.userStoryService.adduserstory(userStoryData, project, User).subscribe(
      response => {
        console.log('User story added successfully:', response);
        this.loadUsers();
        // Réinitialiser le formulaire après l'ajout
        //this.userStoryForm.reset();
        this.router.navigate(['/listUserstoryFront']);
      },
      error => {
        console.error('Error adding user story:', error);
      }
    );
  }
  this.router.navigate(['/listUserstoryFront']);
}

}
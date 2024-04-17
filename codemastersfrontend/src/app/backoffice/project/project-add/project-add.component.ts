import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/houssem/user.service';
import { ProjectService } from 'src/app/services/serviceProjet/project.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  projectForm!: FormGroup;
  selectedUserId: number | undefined; 
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private userService: UserService
  ) { 
    this.projectForm = this.formBuilder.group({
      user: ['', Validators.required],
      name: ['', Validators.required],
      creationdate: ['', Validators.required],
      deadline: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        console.log('Users:', users);
        this.users = users;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }
  
  onSubmit() {
    if (this.projectForm.valid && this.selectedUserId) {
      const projectData: any = {
        user: { id: this.selectedUserId }, // Créer l'objet utilisateur avec l'ID sélectionné
        name: this.projectForm.value.name,
        creationdate: this.projectForm.value.creationdate,
        deadline: this.projectForm.value.deadline,
      };
      this.projectService.addProject(projectData, this.selectedUserId).subscribe(
        () => {
          this.router.navigate(['/listProject']);
        },
        error => {
          console.error('Error adding project:', error);
        }
      );
    } else {
      console.log('Form data is invalid or user is not selected');
    }
    this.router.navigate(['/listProject']);
  }

}

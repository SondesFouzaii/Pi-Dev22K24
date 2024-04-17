import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';
import { Task } from 'src/app/models/task';
import { SprintService } from 'src/app/services/sprint-service.service';
import { TaskService } from 'src/app/services/task-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.scss']
})
export class SprintDetailsComponent implements OnInit {
  sprint: Sprint | any;
  sprintId! :string;
  AllTasks: Task[]  = [];
  SprintTasks: Task[]  = [];
  selectedComplexity: string = '';
  selectedPriority: string = '';
  searchTerm: string = '';
  addRetroForm!:FormGroup;
  retrospectiveAdded=false;

  user: User = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    birth_date: "1990-01-01",
    gender: "Male",
    address: "123 Main St",
    phone_number: "123-456-7890",
    email: "john.doe@example.com",
    password: "password123",
    image: "../../../../assets/assets_FrontOffice/assets/img/10.jpg",
    status: "Active",
    role: "User",
    barrcode: "123456789",
    enabled: true,
    non_locked: true,
    using_mfa: false,
    notifications: [],
    Posts: [],
    teams: [],
    Projectproductowner: [],
    Projectscrummaster: [],
    Claims: [],
    UserStorys: []
};
  
  constructor(private route: ActivatedRoute, private sprintService: SprintService, private taskService :TaskService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.paramMap.get('id') || '';
    this.loadSprint();
    this.taskService.getTasksBySprintNull().subscribe(tasks=>{
      this.AllTasks=tasks;
    })

    this.taskService.getTasksBySprint(parseInt(this.sprintId)).subscribe(tasks=>{
      this.SprintTasks=tasks;

    })
    this.addRetroForm = this.fb.group({
      retrospective: ['', Validators.required]
    });
  
  }


  addRetrospective() {
    if (this.addRetroForm.valid) {
      // Le formulaire est valide, vous pouvez ajouter la rétrospective
      if (this.sprint) {
        // Associer les valeurs du formulaire aux propriétés de la tâche sélectionnée
        const now = new Date().toLocaleString();
        const firstName = '<strong>' + this.user.first_name + '</strong>';
        const lastName = '<strong>' + this.user.last_name + '</strong>';
        const retrospective = '<span class="large">' + this.addRetroForm.value.retrospective + '</span>';
        this.sprint.retrospective = this.sprint.retrospective + '\n' + now + ' - ' + firstName + ' ' + lastName + '\n' + retrospective;
  
        // Appeler la méthode de service pour modifier le sprint
        this.sprintService.modifySprint(this.sprint).subscribe(
          data => {
            console.log(data);
            // Réinitialiser le formulaire après la soumission réussie
            this.addRetroForm.reset();
            this.retrospectiveAdded = true;
          },
          error => console.log(error)
        );
      } else {
        console.log('Retrospective add failed !');
      }
    } else {
      // Le formulaire est invalide, vous pouvez afficher un message d'erreur ou effectuer une autre action
      console.log('Invalid Form !');
    }
  }

  loadSprint() {
    // Appel de la méthode getSprint du service SprintService pour récupérer le sprint par son ID
    this.sprintService.getSprint(+this.sprintId).subscribe(
      (data: Sprint) => {
        this.sprint = data;
      },
      (error) => {
        console.error('Error fetching sprint:', error);
      }
    );
  }


  affectTaskToSprint(sprintId: number, taskId: number) {
    this.sprintService.affectTaskToSprint(sprintId, taskId)
      .subscribe(
        () => {
          // Traitement en cas de succès
          console.log('Task Added');
          this.taskService.getTasksBySprintNull().subscribe(tasks=>{
            this.AllTasks=tasks;
          })

          this.taskService.getTasksBySprint(parseInt(this.sprintId)).subscribe(tasks=>{
            this.SprintTasks=tasks;
      
          })
          
        },
        error => {
          // Traitement en cas d'erreur
          console.error('Error while adding', error);
        }
      );
  }


  removeTaskFromSprint(sprintId: number, taskId: number) {
    this.sprintService.removeTaskFromSprint(sprintId, taskId)
      .subscribe(
        () => {
          // Traitement en cas de succès
          console.log('Task Removed');
          this.taskService.getTasksBySprintNull().subscribe(tasks=>{
            this.AllTasks=tasks;
          })


          this.taskService.getTasksBySprint(parseInt(this.sprintId)).subscribe(tasks=>{
            this.SprintTasks=tasks;
      
          })
          
        },
        error => {
          // Traitement en cas d'erreur
          console.error('Error while removing ', error);
        }
      );
  }


  get filteredTasks(): Task[] {
    let filteredTasks = this.AllTasks;

    if (this.selectedComplexity) {
        filteredTasks = filteredTasks.filter(task => task.complexity === this.selectedComplexity);
    }

    if (this.selectedPriority) {
        filteredTasks = filteredTasks.filter(task => task.priority === this.selectedPriority);
    }

    return filteredTasks;
}





}

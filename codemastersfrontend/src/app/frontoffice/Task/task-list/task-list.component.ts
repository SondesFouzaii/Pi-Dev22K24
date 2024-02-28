import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskStatus, complexity, priority } from '../../../models/task';
import { TaskService } from '../../../services/task-service.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Userstory } from 'src/app/models/userstory';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private fb: FormBuilder, private taskService: TaskService) { }
  taskForm!: FormGroup;
  edit_taskForm!:FormGroup;
  totalProgress: number = 0;


  task: Task = {
    id: 0,
    title: '',
    description: '',
    status: TaskStatus.TO_DO,
    priority: priority.HIGH,
    complexity: complexity.HIGH,
    userstory:undefined,
    sprint:undefined
  };
  Userstory: Userstory = { 
    id: 1,
    name: 'UserStoryName',
    description: 'UserStoryDescr',
    priority: 2,
    estimation: 3
  };
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


  submitted = false;
  tasks: Task[] | null = null;
  todoTasks: Task[] | null = null;
  inProgressTasks: Task[] | null = null;
  doneTasks: Task[] | null = null;
  todoTasksCount: number | null = null;
  inProgressTasksCount: number | null = null;
  doneTasksCount: number | null = null;
  selectedTask: Task | null = null;
  


  ngOnInit(): void {
    this.getToDoTasks();
    this.getInProgressTasks();
    this.getDoneTasks();
    this.calculateTotalProgress();
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: [priority.HIGH, Validators.required],
      complexity: [complexity.HIGH, Validators.required],
      status: [TaskStatus.TO_DO]
    });
    this.edit_taskForm=this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: [priority.HIGH, Validators.required],
      complexity: [complexity.HIGH, Validators.required],
      status: [TaskStatus.TO_DO]

    })
  }

  calculateTotalProgress(): void {
    // Vérifier si les compteurs de tâches sont définis
    if (this.todoTasksCount !== null && this.inProgressTasksCount !== null && this.doneTasksCount !== null) {
      // Calculer le total progress
      const totalTasksCount = this.todoTasksCount + this.inProgressTasksCount + this.doneTasksCount;
      const doneTasksProgress = (this.doneTasksCount / totalTasksCount) * 100;
      this.totalProgress = Math.round(doneTasksProgress);
    }
  }

  openTaskDetails(task: Task) {
    this.selectedTask = task;
    this.Userstory.User=this.user;
    this.selectedTask.userstory=this.Userstory;
  }

  openTaskEdit(task: Task){
    this.selectedTask = task;
    this.edit_taskForm.patchValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      complexity: task.complexity
    });
  }
  
  
  

  getToDoTasks(): void {
    this.taskService.getTasksByStatus(TaskStatus.TO_DO,this.Userstory.id)
      .subscribe(tasks => {
        this.todoTasks = tasks;
        this.todoTasksCount = tasks.length;
        this.calculateTotalProgress();
      });
  }

  getInProgressTasks(): void {
    this.taskService.getTasksByStatus(TaskStatus.IN_PROGRESS,this.Userstory.id)
      .subscribe(tasks => {
        this.inProgressTasks = tasks;
        this.inProgressTasksCount = tasks.length;
        this.calculateTotalProgress();
      });
  }

  getDoneTasks(): void {
    this.taskService.getTasksByStatus(TaskStatus.DONE,this.Userstory.id)
      .subscribe(tasks => {
        this.doneTasks = tasks;
        this.doneTasksCount = tasks.length;
        this.calculateTotalProgress();
      });
  }

  onDrop(event:any) {
    const taskToMove = event.item.data;
    let newStatus: TaskStatus;
  
    // Determine the new status based on the ID of the destination list
    switch (event.container.id) {
      case 'todo-list':
        newStatus = TaskStatus.TO_DO;
        break;
      case 'in-progress-list':
        newStatus = TaskStatus.IN_PROGRESS;
        break;
      case 'done-list':
        newStatus = TaskStatus.DONE;
        break;
      default:
        return; // Do nothing if the list ID is not recognized
    }
  
    taskToMove.status = newStatus;
  
    this.taskService.updateTaskStatus(taskToMove).subscribe(updatedTask => {
      this.updateTaskList(updatedTask);
    });
  }

  updateTaskList(updatedTask: Task): void {
    if (updatedTask.status === TaskStatus.TO_DO) {
      this.getToDoTasks();
    } else if (updatedTask.status === TaskStatus.IN_PROGRESS) {
      this.getInProgressTasks();
    } else if (updatedTask.status === TaskStatus.DONE) {
      this.getDoneTasks();
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData: Task = this.taskForm.value;
    taskData.userstory = this.Userstory;
      this.taskService.addTask(taskData).subscribe(
        data => {
          console.log(data);
          // Réinitialisez le formulaire après la soumission réussie
          this.taskForm.reset();
        },
        error => console.log(error)
      );
    } else {
      // Gérez les cas où le formulaire n'est pas valide
      console.log('Le formulaire n\'est pas valide.');
    }
    window.location.reload();
  }


  onEdit() {
    if (this.selectedTask) {
      // Associer les valeurs du formulaire aux propriétés de la tâche sélectionnée
      this.selectedTask.title = this.edit_taskForm.value.title;
      this.selectedTask.description = this.edit_taskForm.value.description;
      this.selectedTask.priority = this.edit_taskForm.value.priority;
      this.selectedTask.complexity = this.edit_taskForm.value.complexity;
  
      // Appeler la méthode de service pour modifier la tâche
      this.taskService.modifyTask(this.selectedTask).subscribe(
        data => {
          console.log(data);
          // Réinitialiser le formulaire après la soumission réussie
          this.edit_taskForm.reset();
          // Réinitialiser la tâche sélectionnée
          this.selectedTask = null;
        },
        error => console.log(error)
      );
    } else {
      // Gérez les cas où le formulaire n'est pas valide ou aucun selectedTask
      console.log('Le formulaire n\'est pas valide ou aucune tâche sélectionnée.');
    }
    
  }
  
  openTaskForm(status: String) {
    this.taskForm.reset(); // Réinitialiser le formulaire
    if(status==='TO_DO')
    {
      this.taskForm.patchValue({
        status: TaskStatus.TO_DO // Pré-remplir le champ de l'état avec la valeur passée en paramètre
    });
    }

    else if(status==='IN_PROGRESS')
    {
      this.taskForm.patchValue({
        status: TaskStatus.IN_PROGRESS // Pré-remplir le champ de l'état avec la valeur passée en paramètre
    });
    }
    else 
    {
      this.taskForm.patchValue({
        status: TaskStatus.DONE // Pré-remplir le champ de l'état avec la valeur passée en paramètre
    });
    }
    
}





onDeleteTask(taskId: number): void {
  this.taskService.deleteTask(taskId).subscribe(
    () => {
      console.log('Tâche supprimée avec succès');
      // Mettre à jour l'interface utilisateur si nécessaire
    },
    error => {
      console.error('Erreur lors de la suppression de la tâche : ', error);
    }
  );
  window.location.reload();
}



}

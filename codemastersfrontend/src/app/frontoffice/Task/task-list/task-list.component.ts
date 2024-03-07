import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskStatus, complexity, priority } from '../../../models/task';
import { TaskService } from '../../../services/task-service.service';
import { Userstory } from 'src/app/models/userstory';
import { User } from 'src/app/models/user';
import {CdkDrag,CdkDragDrop,CdkDropList,CdkDropListGroup, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';



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
    name: 'Implementer l\'interface User',
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
  todoTasks: Task[] = []; 
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  todoTasksCount: number | null = null;
  inProgressTasksCount: number | null = null;
  doneTasksCount: number | null = null;
  selectedTask: Task | null = null;
  StatisticsTasks: Task[] = []; 
  
  


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
           console.log(taskData);
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

drop(event: CdkDragDrop<Task[]>, targetList: Task[]) {
  if (event.previousContainer === event.container) {
    // Si l'élément est déplacé dans la même liste
    moveItemInArray(targetList, event.previousIndex, event.currentIndex);
  } else {
    let taskToMove = event.item.data;
    let newStatus: TaskStatus;

    if (!taskToMove) {
      console.error("La tâche à déplacer n'est pas définie.");
      return;
    }

    // Déterminez le nouveau statut en fonction de l'ID de la liste de destination
    switch (event.container.id) {
      case 'todo-list':
        newStatus = TaskStatus.TO_DO;
        break;
      case 'in-progress-list':
        newStatus = TaskStatus.IN_PROGRESS;
        taskToMove.startTime = Date.now();
        this.addOrUpdateTask(this.StatisticsTasks,taskToMove);
        break;
      case 'done-list':
        newStatus = TaskStatus.DONE;
        taskToMove.endTime = Date.now();
        this.addOrUpdateTask(this.StatisticsTasks,taskToMove);
        break;
      default:
        return; // Ne rien faire si l'ID de la liste n'est pas reconnu
    }

    // Mettre à jour le statut de la tâche déplacée
    taskToMove.status = newStatus;

    // Mettre à jour la liste des tâches sur le serveur
    this.taskService.updateTaskStatus(taskToMove).subscribe(updatedTask => {
      // Mettre à jour les listes de tâches
      this.getDoneTasks();
      this.getInProgressTasks();
      this.getToDoTasks();
    });
  }
}


calculateElapsedTime(startTime: Date, endTime: Date): number {
  const elapsedTime = endTime.getTime() - startTime.getTime();
  // Convertir le temps en millisecondes en secondes
  const elapsedSeconds = elapsedTime / 1000;
  return elapsedSeconds;
}


addOrUpdateTask(taskList: Task[], taskToAddOrUpdate: Task): void {
  const existingTaskIndex = taskList.findIndex(task => task.id === taskToAddOrUpdate.id);

  if (existingTaskIndex !== -1) {
    // La tâche existe déjà dans la liste, la remplacer
    taskList[existingTaskIndex].endTime = taskToAddOrUpdate.endTime;
  } else {
    // La tâche n'existe pas dans la liste, l'ajouter
    taskList.push(taskToAddOrUpdate);
  }
}













}


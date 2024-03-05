import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from 'src/app/models/sprint';
import { Task } from 'src/app/models/task';
import { SprintService } from 'src/app/services/sprint-service.service';
import { TaskService } from 'src/app/services/task-service.service';

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

  constructor(private route: ActivatedRoute, private sprintService: SprintService, private taskService :TaskService) { }

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.paramMap.get('id') || '';
    this.loadSprint();
    this.taskService.getTasksBySprintNull().subscribe(tasks=>{
      this.AllTasks=tasks;
    })
    this.taskService.getTasksBySprint(parseInt(this.sprintId)).subscribe(tasks=>{
      this.SprintTasks=tasks;

    })
  
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



}

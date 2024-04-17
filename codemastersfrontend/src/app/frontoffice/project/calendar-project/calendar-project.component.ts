import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/serviceProjet/project.service';

@Component({
  selector: 'app-calendar-project',
  templateUrl: './calendar-project.component.html',
  styleUrls: ['./calendar-project.component.scss']
})
export class CalendarProjectComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: any;
  calendar: Calendar = {} as Calendar;
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.retrieveAllProjects().subscribe((projects: Project[]) => {
      this.projects = projects;

      const events = this.projects.map((project: Project) => ({
        title: project.name,
        start: project.creationdate,
        end: project.deadline
      }));

      this.calendar = new Calendar(this.calendarComponent.nativeElement, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        events: events
      });

      this.calendar.render();
    }, error => {
      console.error('Error fetching projects:', error);
    });
  }
}

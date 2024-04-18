import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/teamservice/team.service';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the plugin
import { Team } from 'src/app/models/Team';
import { CalendarOptions } from '@fullcalendar/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-calendar',
  templateUrl: './team-calendar.component.html',
  styleUrls: ['./team-calendar.component.scss']
})

export class TeamCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],  // Populated in ngOnInit
    eventClick: (clickInfo) => {
        const eventId = clickInfo.event.id; // Retrieve the event id
        if (eventId) {
            this.router.navigate(['/front-team', eventId]); // Navigate using the event id
        } else {
            console.error('No ID provided for this event');
        }
    }
};


  constructor(private teamService: TeamService, private router: Router) {}

  ngOnInit() {
    this.teamService.getTeamsForCalendar().subscribe({
        next: (response: { content: Team[] }) => {
            this.calendarOptions = {
                ...this.calendarOptions,
                events: response.content.map((team: Team) => ({
                    title: team.name,
                    date: team.createdDate, // Assuming this is already a Date object or compatible string
                    
                    id: team.id.toString() // Convert id to string
                }))
            };
        },
        error: (error) => console.error('Error fetching teams', error)
    });
}




}

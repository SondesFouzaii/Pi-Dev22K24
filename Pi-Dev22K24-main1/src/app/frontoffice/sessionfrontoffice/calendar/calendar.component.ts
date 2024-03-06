import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SessionService } from 'src/app/services/session.service';
import { SharingService } from 'src/app/services/sharing.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  days: any = [];
  visionMonth: boolean = true;
  daysWeek: string[] = ['Sunday','Monday', 'Tuesday', 'Thirsday', 'Wednesday', 'Friday', 'Saturday'];
  allSessions: any= [];

  constructor(
    private sessionService: SessionService,
    private router: Router
    
    ) {    }

  ngOnInit(): void {
    
    this.sessionService.getAllSessions().subscribe((data) => {
      this.allSessions = data;
      this.getDaysInMonth();
      console.log(data);
    })
    
  }

  drop(event: CdkDragDrop<string[]>) {
    debugger;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getDaysInMonth() {
    let calendar = [];
    const today = moment();
    const startDay = today.clone().startOf('month').startOf('week');
    const endDay = today.clone().endOf('month').endOf('week');

    let date = startDay.clone().subtract(1, 'day');

    while (date.isBefore(endDay, 'day'))
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => date.add(1, 'day').clone())
      );

    calendar.map((week) =>
      week.map((day) => {
      
        let data = this.allSessions?.filter((session : any) => {
          return (Number(session?.dateSession.substring(8,10)) == Number(day.date().toString())) && (Number(session?.dateSession.split('-')[1])  == Number(day.month().toString())+1 )});
        const isCurrentDay =
          moment().format('DD-MM-YY') === moment(day).format('DD-MM-YY');
        const currentMonth = moment(day).clone().startOf('month');
        this.days.push({
          id: `${Math.floor(Math.random() * 1000000)}`,
          day: moment(day).format('D').toString(),
          dayWeekName: moment(day).locale('en').format('dddd').toString(),
          isCurrentDay,
          isMonth: moment().isBetween(
            moment(currentMonth).startOf('month'),
            moment(currentMonth).endOf('month')
          ),
          actions: data.map((session: any) => {
            return {
              name: session?.name,
              session: session
            }
          }),
        });
        
      })
    );
  }

  trackIds(): string[] {
    return this.days.map((track: any) => track.id);
  }

  goToSession(session: any){
    console.log("session : ", session);
    const url = `/open-session/${session.code}/${session.name}`;
    this.router.navigateByUrl(url);
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Activities } from 'src/app/models/activitie';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit{
  constructor(private userservice: UserService){}
  activities!:Activities[];
  ngOnInit(): void {
    this.getallactivities();
  }
  public getallactivities(): void{
    this.userservice.getActivities().subscribe(
      (response:Activities[])=>{
        this.activities=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
}

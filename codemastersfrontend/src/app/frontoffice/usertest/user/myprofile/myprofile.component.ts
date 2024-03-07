import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activities } from 'src/app/models/activitie';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  connecteduser!: User;
  imgtest!: any ;
  constructor(private serv: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.serv.getUserbyemail().subscribe(
      (user: User) => {
        this.connecteduser = user;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle error accordingly
      }
    );

    this.getallactivities();
  }


   activities!:Activities[];
  public getallactivities(): void{
    this.serv.getActivities().subscribe(
      (response:Activities[])=>{
        this.activities=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  updatePhoto(): void {
    this.serv.modifierImage(this.connecteduser.id, this.imgtest).subscribe();
    location.reload();
  }

  handleFileInput(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      this.imgtest = file.name;
    }
  }
}

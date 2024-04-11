import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeminiAPI } from 'src/app/models/config';
import { Activities, User } from 'src/app/models/user';
import { UserTest } from 'src/app/models/usertest';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  msg!: string;
  msge!: string;
  passwordForm!: FormGroup;
  oldpwd!: string;
  newpwd!: string;
  newpwd2!: string;
  connecteduser!: User;
  imgtest!: any;
  search: any;
  constructor(private serv: UserService, private activatedRoute: ActivatedRoute, private router: Router, private quizservice: QuizService) { }

  ngOnInit(): void {
    this.serv.getUserbyemail().subscribe(
      (user: User) => {
        this.connecteduser = user;
        this.getTestHistory();
        this.getgemenis();
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle error accordingly
      }
    );

    this.getallactivities();
  }


  activities!: Activities[];
  public getallactivities(): void {
    this.serv.getActivities().subscribe(
      (response: Activities[]) => {
        this.activities = response;
      },
      (error: HttpErrorResponse) => {
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

  onSubmit(): void {
    if (this.newpwd == this.newpwd2 && this.newpwd.length > 5) {
      this.serv.updatePasswd(this.connecteduser.id, this.oldpwd, this.newpwd).subscribe(
        response => {
          // Handle success response
          this.msg = response.toString(); // Assuming response contains a success message

        },
        error => {
          // Handle error response
          this.msg = error.error.text; // Access error message correctly
          console.log(this.msge);
        }
      );
    } else {
      // Display an error message if conditions are not met
      this.msg = "New password and confirmation password don't match or the password length is less than 6 characters.";
    }
  }
  quizhistory!: any[];
  getTestHistory(): void {
    this.quizservice.getquizhistory().subscribe(
      (res: UserTest[]) => {
        this.quizhistory = res;
        console.log("Quiz History:", res);
      },

    );
  }

  gemenis: GeminiAPI[] = [];
  getgemenis(): void {
    this.quizservice.getgeminis(this.connecteduser.id).subscribe(
      (response: GeminiAPI[]) => {
        this.gemenis = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching tests:', error);
      }
    );
  }
}

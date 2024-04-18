import { HttpErrorResponse } from '@angular/common/http';
import { Call } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Callsomeone } from 'src/app/models/config';
import { User } from 'src/app/models/user';
import { CallService } from 'src/app/services/call.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teamate',
  templateUrl: './teamate.component.html',
  styleUrls: ['./teamate.component.scss'],
})
export class TeamateComponent implements OnInit {
  addACall!: Callsomeone;
  connectedUser!: User;
  id!: number;
  user!: User;
  value = 'Clear me';
  linktocall:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private uservice: UserService,
    private callservice: CallService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getUser();
      this.getcobbecteduser();
    });
  }

  getUser(): void {
    this.uservice.getUser(this.id).subscribe(
      (response: User) => {
        this.user = response;
        this.linktocall="http://192.168.1.105:4200/call/LOC9N4lf/"+response.id;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getcobbecteduser() {
    this.uservice.getUserbyemail().subscribe((user: User) => {
      this.connectedUser = user;
    });
  }

  openVideoCall(): void {
    //save the video call in the data base
    this.addACall = new Callsomeone();
    this.addACall.idappelant = this.connectedUser.id;
    this.addACall.idappeler = this.id;
    this.callservice.makeACall(this.addACall).subscribe();

    //open the video call
    const width = 500;
    const height = 500;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      'http://localhost:4201/call/LOC9N4lf/' + this.id,
      'NewWindow',
      `width=${width}, height=${height}, left=${left}, top=${top}`
    );
  }
}

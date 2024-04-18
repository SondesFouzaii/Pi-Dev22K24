import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { CallService } from '../services/call.service';
import { sleep } from 'openai/core';

@Component({
  selector: 'app-frontoffice',
  templateUrl: './frontoffice.component.html',
  styleUrls: ['./frontoffice.component.scss'],
})
export class FrontofficeComponent implements OnInit {
  connecteduser!: User;
  someoneIsCalling = false;
  thecaller: any;
  linktocall: any;
  constructor(
    private callservice: CallService,
    private serv: UserService,
    private router: Router,
    private renderer: Renderer2
  ) {}
  interval: any;
  ngOnInit(): void {
    this.serv.getUserbyemail().subscribe(
      (user: User) => {
        this.connecteduser = user;
        if (this.connecteduser.role == 'ADMIN') {
          this.router.navigate(['/back']);
        }
        this.interval = setInterval(() => {
          this.amICalledByAFriend(); // Fetch tests at fixed intervals
          this.whoIsCallimgMeNow();
          if (this.someoneIsCalling == true) {
            sleep(20000);
          }
        }, 400000);
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle error accordingly
      }
    );
  }
  amICalledByAFriend() {
    this.callservice
      .isSomeoneCallingMe(this.connecteduser.id)
      .subscribe((result: boolean) => {
        this.someoneIsCalling = result;
        //console.log(result);
        if (this.someoneIsCalling == true) {
          this.linktocall="http://192.168.1.105:4200/call/LOC9N4lf/"+this.thecaller.id;
          this.openCallModal();
        }
      });
  }

  whoIsCallimgMeNow() {
    this.callservice.whoIsCallingMe(this.connecteduser.id).subscribe(
      (response: User) => {
        this.thecaller = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  answer() {
    //do you work ?
    //open the video call
    const width = 500;
    const height = 500;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    this.callservice.pickUpThePhone().subscribe(() => {
      console.log('picking up the phone');
    });
    this.someoneIsCalling = false;
    this.closeCallModal();
    window.open(
      'http://localhost:4201/call/LOC9N4lf/' + this.thecaller.id,
      'NewWindow',
      `width=${width}, height=${height}, left=${left}, top=${top}`
    );
  }

  openCallModal() {
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      this.renderer.addClass(modalElement, 'show'); // Add the 'show' class to display the modal
      this.renderer.setStyle(modalElement, 'display', 'block'); // Set the display style to 'block'
    }
  }

  closeCallModal() {
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      this.renderer.removeClass(modalElement, 'show'); // Remove the 'show' class to hide the modal
      this.renderer.setStyle(modalElement, 'display', 'none'); // Set the display style to 'none'
      this.someoneIsCalling = false;
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          this.someoneIsCalling = false;
        }, (i + 1) * 4000);
      }
    }
  }
}

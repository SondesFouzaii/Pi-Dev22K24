import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { sleep } from 'openai/core';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent {
  @ViewChild('root')
  root!: ElementRef;

  connecteduser!: User;
  roomID!: string;
  id!: number;
  finalID: string = "default";
  constructor(private serv: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.roomID = "LOC9N4lf";
      this.id = params['id'];

      // Get the connected user
      this.serv.getUserbyemail().subscribe(
        (user: User) => {
          this.connecteduser = user;
sleep(10);
          if (this.id < this.connecteduser.id) {
            this.finalID = this.id.toString() + this.roomID + (this.connecteduser.id).toString();
          } else {
            this.finalID = (this.connecteduser.id).toString() + this.roomID + this.id.toString();
          }

          // Call startCall() here to ensure finalID is properly set
          this.startCall();
        },
        (error) => {
          console.error('Error fetching user data:', error);
          // Handle error accordingly
        }
      );
    });
  }


  startCall(): void {
    // Generate Kit Token
    const appID = 4380595200;
    const serverSecret = "01c949cbae46e9a46470c3313ec844de0";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, this.finalID, this.connecteduser.id.toString(), this.connecteduser.first_name.toString() + " " + this.connecteduser.last_name.toString());

    // Create instance object from Kit Token
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Start the call
    zp.joinRoom({
      container: this.root.nativeElement,
      sharedLinks: [
        {
          name: 'Personal link',
          url: `${window.location.origin}${window.location.pathname}?roomID=${this.finalID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].GroupCall
      },
    });
  }
}
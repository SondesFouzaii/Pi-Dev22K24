import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent {
  @ViewChild('root')
  root!: ElementRef;

  connecteduser!: User;
  roomID: any;

  constructor(private serv: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.roomID = params['room'];

      // Get the connected user
      this.serv.getUserbyemail().subscribe(
        (user: User) => {
          this.connecteduser = user;
          if (this.connecteduser.role === 'ADMIN') {
            this.router.navigate(['/back']);
          } else {
            this.startCall();
          }
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
    const appID = 42312;
    const serverSecret = "";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, this.roomID, this.connecteduser.id.toString(), this.connecteduser.first_name.toString()+" "+this.connecteduser.last_name.toString());

    // Create instance object from Kit Token
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Start the call
    zp.joinRoom({
      container: this.root.nativeElement,
      sharedLinks: [
        {
          name: 'Personal link',
          url: `${window.location.origin}${window.location.pathname}?roomID=${this.roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  }
}
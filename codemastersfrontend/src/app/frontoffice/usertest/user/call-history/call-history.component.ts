import { Component, Input, OnInit } from '@angular/core';
import { Callsomeone } from 'src/app/models/config';
import { CallService } from 'src/app/services/call.service';

@Component({
  selector: 'app-call-history',
  templateUrl: './call-history.component.html',
  styleUrls: ['./call-history.component.scss'],
})
export class CallHistoryComponent implements OnInit {
  @Input() connectedUser: any;
  constructor(private callservice: CallService) {}
  historyofcalls!: Callsomeone[];
  ngOnInit(): void {
    this.getAllCalls();
  }
  getAllCalls() {
    this.callservice
      .getMyCallHistory(this.connectedUser.id)
      .subscribe((result: Callsomeone[]) => {
        this.historyofcalls = result;
      });
  }
  getCallStatusMessage(call: Callsomeone): string {
    if (this.connectedUser.id === call.idappelant) {
      if (call.ansered) {
        return "appel sortant ok";
      } else {
        return "appel sortant non answered";
      }
    } else if (this.connectedUser.id === call.idappeler) {
      if (call.ansered) {
        return "appel entrant ok";
      } else {
        return "appel entrant non answered";
      }
    }
    return "";
  }
  getCallStatusImage(call: Callsomeone): string {
    if (this.connectedUser.id === call.idappelant) {
      return call.ansered ? "../../../../../assets/img/call/green.jpg" : "../../../../../assets/img/call/red.jpg";
    } else if (this.connectedUser.id === call.idappeler) {
      return call.ansered ? "../../../../../assets/img/call/blue.jpg" : "../../../../../assets/img/call/redme.jpg";
    }
    return "";
  } 
  //src\assets   C:\Users\houss\OneDrive\Desktop\housssss\Pi-Dev22K24\codemastersfrontend\src\assets

  getCallerName(call: Callsomeone): string {
    if (this.connectedUser.id === call.idappelant) {
      return call.nomappeler;
    } else if (this.connectedUser.id === call.idappeler) {
      return call.nomappelant;
    }
    return "";
  }
}

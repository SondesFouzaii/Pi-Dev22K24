import { Component, Input, OnInit } from '@angular/core';
import { Callsomeone } from 'src/app/models/config';
import { CallService } from 'src/app/services/call.service';

@Component({
  selector: 'app-call-history',
  templateUrl: './call-history.component.html',
  styleUrls: ['./call-history.component.scss']
})
export class CallHistoryComponent implements OnInit{
  @Input() connectedUser: any;
  constructor(private callservice: CallService){}
  historyofcalls!:Callsomeone[];
  ngOnInit(): void {
    this.getAllCalls();
  }
  getAllCalls(){
    this.callservice.getMyCallHistory(this.connectedUser.id).subscribe((result: Callsomeone[]) => {
      this.historyofcalls=result;
    })
  }
}

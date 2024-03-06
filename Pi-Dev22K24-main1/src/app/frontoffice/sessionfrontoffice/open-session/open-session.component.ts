import { query } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { SharingService } from 'src/app/services/sharing.service';
import Swal from 'sweetalert2';
import { MyDialogComponent } from './my-dialog/my-dialog.component';


@Component({
  selector: 'app-open-session',
  templateUrl: './open-session.component.html',
  styleUrls: ['./open-session.component.scss']
})
export class OpenSessionComponent {
  code: string |null = null;
  name: string |null = null;
  sessionData: any;
  selectedRating: number=0;

  constructor(private route: ActivatedRoute,
    private dataSharingService: SharingService,
    private sessionsService: SessionService,
    private router: Router,
    public dialog: MatDialog
    ) { }

    openDialog(session: any): void {
      const dialogRef = this.dialog.open(MyDialogComponent, {
        width: '500px',
        height: '350px',
        data: { sessionData: session } 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  ngOnInit(): void {
    console.log(this.sessionData);

    this.dataSharingService.getSessionData().subscribe(data => {
      this.sessionData = data;
    });
    
    this.route.params.subscribe(params => {
      this.code = params['sessionCode'];
      const name = params['sessionName'];
    });
    if(!this.sessionData){
      this.sessionsService.getSessionByCode(this.code).subscribe((data) =>{
        this.sessionData = data;
      });
    }

    

  }
  openSession(){
    this.sessionsService.startSession(this.sessionData).subscribe();
    location.reload();
  }
  finishSession(){
    this.openDialog(this.sessionData);

    // this.sessionsService.endSession(this.sessionData).subscribe();
    // location.reload();
  }

  returnFromSession(){
    this.router.navigate(['/front/front-session']);
  }
}

import { query } from '@angular/animations';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { SharingService } from 'src/app/services/sharing.service';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { Subject, Subscription, interval, takeUntil } from 'rxjs';


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
    //hethi
    elapsedTime: string | undefined;
    private onDestroy = new Subject<void>();
    private timerSubscription!: Subscription;

  constructor(private route: ActivatedRoute,
    private dataSharingService: SharingService,
    private sessionsService: SessionService,
    private router: Router,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef 
    ) {       this.timerSubscription = new Subscription(); }

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

    interval(1000).pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => {
      this.elapsedTime = this.getElapsedTime();
      this.cdRef.detectChanges(); // Trigger change detection
    });

    this.timerSubscription = interval(1000).pipe(
      takeUntil(this.onDestroy)
    ).subscribe(() => {
      this.elapsedTime = this.getElapsedTime();
      this.cdRef.detectChanges(); // Trigger change detection
    });


    

  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
  openSession(){
    this.sessionsService.startSession(this.sessionData).subscribe();
    location.reload();
  }


  finishSession(){
    this.openDialog(this.sessionData);
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Unsubscribe from the timer when the session is finished
    }
    this.elapsedTime = undefined;
    this.sessionData.etat = 'EXPIRED'; // Mise à jour de l'état de la session
    //this.sessionsService.endSession(this.sessionData).subscribe();
    //location.reload();
  }

  returnFromSession(){
    this.router.navigate(['/front-session']);
  }


  getElapsedTime(): string {
    // Vérifie si la session est active
    if (this.sessionData && this.sessionData.etat === 'ACTIVE') {
      const startDate = new Date(this.sessionData.dateSession);
      const currentDate = new Date();
      const elapsedTime = startDate.getTime() + currentDate.getTime();
  
      // Convertit les millisecondes en format HH:mm:ss
      const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24) + 1;
      const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
      const seconds = Math.floor((elapsedTime / 1000) % 60);
  
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return ''; // Si la session n'est pas active, retourne une chaîne vide
    }
  }
}

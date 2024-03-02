//import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Session } from 'src/app/models/session';
import { SessionService } from 'src/app/services/session.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.scss']
})
export class EditSessionComponent implements OnInit {

  session: Session = new Session(); // Correctly initialize the session object
  idSession!: number;
  idProject: number = 2; // Define idProject and idCard if needed
  idCard: number = 1;

  constructor(private sessionService: SessionService, private ac: ActivatedRoute) {}

  ngOnInit() {
    const sessionIdParam = this.ac.snapshot.paramMap.get('idSession');
    
    if (sessionIdParam !== null && sessionIdParam !== undefined) {
      this.idSession = +sessionIdParam;
      

      this.sessionService.getSessionById(this.idSession).subscribe(
        (data: any) => {

          if (data !== null) {
            this.sessionService = data;
          } else {
            console.error('Error: Reservation data is null');
          }
        },
        (error) => {
          console.error('Error fetching reservation details:', error);
        }
      );
    } else {
      console.error('Error: Reservation ID is null or undefined');
    }
  }

  // updateSession() {
  //   const projectId = 1; // Remplacez par l'ID du projet approprié
  //   const cardId = 1; // Remplacez par l'ID de la carte approprié
  //   // Assuming this.session, this.idProject, and this.idCard are already defined
  //   this.sessionService.updateSession(this.session, projectId, cardId).subscribe(
  //     updatedSession => {
  //       console.log('Session updated successfully:', updatedSession);
  //     },
  //     error => {
  //       console.error('Error updating session:', error);
  //     }
  //   );
  // }



}

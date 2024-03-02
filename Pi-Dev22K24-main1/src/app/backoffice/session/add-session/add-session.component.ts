import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { DatePipe } from '@angular/common';
import { Session } from 'src/app/models/session';


@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent {
  
  
  dateSession: any | null = null;
  timeSession: any | null = null;

   constructor(private fb: FormBuilder, 
              private sessionService: SessionService,
              private router: Router,
              private route: ActivatedRoute,
              private datePipe: DatePipe
             ) { }
         
  myform!:FormGroup;
  hours: number[] = [];
  minutes: number[] = [];
  ngOnInit(): void {
    this.initTimeOptions(); 
    this.myform = this.fb.group({
      dateSession: ['', Validators.required],
      timeSession: ['', Validators.required], // Assurez-vous que la valeur par défaut est vide
   
    });
    
  }

  initTimeOptions(): void {
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
    for (let i = 0; i < 60; i++) {
      this.minutes.push(i);
    }
  }
  
  addSession() {
    
    this.dateSession = this.myform.value.dateSession;
    this.timeSession= this.myform.value.timeSession;

    // Extraire l'année, le mois et le jour de dateSession
    const [year, month, day] = this.dateSession.split('-').map(Number);
    const projectId = 5; // Remplacez par l'ID du projet approprié
    const cardId = 1; // Remplacez par l'ID de la carte approprié
    const sessionDate = new Date(year, month - 1, day); // Remove time from date creation
    const [hours, minutes] = this.dateSession.split(':').map(Number);

    const body = {'dateSession': this.dateSession, 'timeSession' : this.timeSession};
    this.sessionService.addSession(body, projectId, cardId)
      .subscribe(newSession => {
        console.log('Session ajoutée avec succès:', newSession);
        //this.router.navigate(['/show-sessions']);
        //location.reload();
      }, error => {
        console.error('Erreur lors de l\'ajout de la session:', error);
      });     
  }
}


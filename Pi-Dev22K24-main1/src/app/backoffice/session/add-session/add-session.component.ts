import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Session } from 'src/app/models/session';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent {

  constructor(private sessionService: SessionService) { }
  myform!:FormGroup
  ngOnInit(): void {
    this.myform=new FormGroup({
     
      date:new FormControl(''),
      time:new FormControl(''),

      
    })

  }

  addSession() {
   
    const projectId = 3; // Remplacez par l'ID du projet approprié
    const cardId = 1; // Remplacez par l'ID de la carte approprié
    console.log(this.myform.value)
    this.sessionService.addSession(this.myform.value, projectId, cardId)
      .subscribe(newSession => {
        console.log('Session ajoutée avec succès:', newSession);
      }, error => {
        console.error('Erreur lors de l\'ajout de la session:', error);
      });
  }

}

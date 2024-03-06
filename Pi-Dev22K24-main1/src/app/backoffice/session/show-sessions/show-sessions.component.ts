import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/session';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-show-sessions',
  templateUrl: './show-sessions.component.html',
  styleUrls: ['./show-sessions.component.scss']
})
export class ShowSessionsComponent  implements OnInit {
  sessions: any[] = [];
  searchTerm: string = '';
  session: any | null = null;         
  dateSession: any | null = null;
  timeSession: any | null = null;
  cardId: any | null = null;
  showAdd: boolean = false;
  showUpdate: boolean = false;
  myform!:FormGroup;
  hours: number[] = [];
  minutes: number[] = [];
  cards: any[] | null = null;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    // private location: Location
  ) {}

  ngOnInit(): void {
    
    this.sessionService.getAllSessions().subscribe((data) => {
      this.sessions = data;
    });
    this.initTimeOptions(); 
    this.myform = this.fb.group({
      dateSession: ['', Validators.required],
      timeSession: ['', Validators.required], 
      cardId: ['', Validators.required], 
   
    });

    this.sessionService.getAllCards().subscribe((data) => {
      this.cards = data;
      console.log("cards are : ", data);
    })
  }



  addthisSession() {
   this.showAdd = true;
  }
  showDetails(idSession: any) {
    this.router.navigate(['/session/detailSess', idSession]);
  }

  deleteSession(sess: Session) {
    this.sessionService.deleteSession(sess).subscribe((data) => {
      console.log(data);
      location.reload();
    });
  }
  updateSession(session: any) {
    this.session = session;
    this.showUpdate = true;
  }
  disShowUpdate(){
    this.showUpdate = false;
  }
  getFilteredSessions() {
    return this.sessions.filter(session =>
      session.id.toString().includes(this.searchTerm) ||
      session.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      session.date.toString().includes(this.searchTerm) ||
      session.time.toString().includes(this.searchTerm) ||
      session.isclosed.toString().includes(this.searchTerm) ||
      session.code.toString().includes(this.searchTerm) ||
      session.url.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (session.card && session.card.numeroChambre.toString().includes(this.searchTerm)) ||
      // session.messages.some(message => message.text.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      // session.feedBacks.some(feedback => feedback.text.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      session.project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  

  
  initTimeOptions(): void {
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
    for (let i = 0; i < 60; i++) {
      this.minutes.push(i);
    }
  }
  disShow(){
    this.showAdd = false;
  }
  editSession(){
    this.sessionService.updateSession(this.session).subscribe();
    this.showUpdate = false;

  }
  addSession() {
    
    this.dateSession = this.myform.value.dateSession;
    this.timeSession= this.myform.value.timeSession;
    this.cardId= this.myform.value.cardId;

    console.log(" card id is : ", this.cardId);
    
    // Extraire l'année, le mois et le jour de dateSession
    const [year, month, day] = this.dateSession.split('-').map(Number);
    const projectId = 5; // Remplacez par l'ID du projet approprié
    const sessionDate = new Date(year, month - 1, day); // Remove time from date creation
    const [hours, minutes] = this.dateSession.split(':').map(Number);

    const body = {'dateSession': this.dateSession, 'timeSession' : this.timeSession};
    this.sessionService.addSession(body, projectId, this.cardId)
      .subscribe(newSession => {
        console.log('Session ajoutée avec succès:', newSession);
      }, error => {
        console.error('Erreur lors de l\'ajout de la session:', error);
      });   
      this.showAdd = false; 
      location.reload();
  }
}

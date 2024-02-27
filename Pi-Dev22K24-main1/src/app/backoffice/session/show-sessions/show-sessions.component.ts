import { Component, OnInit } from '@angular/core';
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

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sessionService.getAllSessions().subscribe((data: any) => {
      console.log(data);
      this.sessions = data;
    });
  }

  addSession() {
    this.router.navigate(['/add-sessions']); // Naviguer vers la page d'ajout
  }
  showDetails(idSession: any) {
    this.router.navigate(['/session/detailSess', idSession]);
  }

  deleteSession(sess: Session) {
    this.sessionService.deleteSession(sess).subscribe((data) => {
      console.log(data);
    });
  }
  editReservation(reservationId: number) {
    console.log('Editing reservation with ID:', reservationId);
    this.router.navigate(['/gestion-reservation/updateReservation', reservationId]);
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
  

}

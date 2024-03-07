import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-choose',
  templateUrl: './card-choose.component.html',
  styleUrls: ['./card-choose.component.scss']
})
export class CardChooseComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void {
    // Code à exécuter lors de l'initialisation du composant
  }
  navigateToEstimate() {
    this.router.navigate([  'card', 'homecard']);
    // this.router.navigate(['/card']);
  }

}

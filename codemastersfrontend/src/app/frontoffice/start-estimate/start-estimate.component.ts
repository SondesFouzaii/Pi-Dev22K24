import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-start-estimate',
  templateUrl: './start-estimate.component.html',
  styleUrls: ['./start-estimate.component.scss']
})
export class StartEstimateComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void {
    // Code à exécuter lors de l'initialisation du composant
  }
  navigateToEstimate() {
    this.router.navigate([ 'card', 'homecard']);
    // this.router.navigate(['/card']);
  }
}
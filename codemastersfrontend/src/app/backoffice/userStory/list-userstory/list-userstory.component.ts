import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserstoryService } from 'src/app/services/serviceUserstory/userstory.service';
import { Router } from '@angular/router';
import { Userstory } from 'src/app/models/userstory';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-list-userstory',
  templateUrl: './list-userstory.component.html',
  styleUrls: ['./list-userstory.component.scss']
})
export class ListUserstoryComponent {
  userstorys: Userstory[] = [];
  chart: any;
  @ViewChild('myChart') myChart!: ElementRef;

  constructor(
    private userstoryService: UserstoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getuserstorys();
    //chart
    this.userstoryService.retrieveAlluserstorys().subscribe((data) => {
      this.userstorys = data;
      
      // Extraire les noms des foyers
      const labels = this.userstorys.map((userStory: Userstory) => userStory.name);

      // Extraire les capacités des foyers
      const capacities = this.userstorys.map((userStory: Userstory) => userStory.priority);

      // Créer le graphique avec les données actualisées
      this.createChart(labels, capacities);
      // Capacité disponible
 
    
    });
}

  getuserstorys(): void {
    this.userstoryService.retrieveAlluserstorys().subscribe(userstorys => {
      this.userstorys = userstorys;
    //  this.generateChart(); // Appel de generateChart() après avoir reçu les données
    });
  }
  
  delete(userstory: Userstory) {
    if (userstory && userstory.id !== undefined) {
      this.userstoryService.removeuserstory(userstory.id).subscribe(() => {
        this.userstorys = this.userstorys.filter(
          (f: Userstory) => f.id !== userstory.id
        );
        // Mise à jour du graphique après la suppression
       // this.generateChart();
      });
    }
  }

  update(id: any) {
    this.router.navigate(['/editUserstory', id]);
  }

  details(id: any) {
    this.router.navigate(['/detailUserstory', id]);
  }

 
  createChart(labels: string[], data: number[]) {
    const ctx = this.myChart.nativeElement.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, 
        datasets: [{
          label: 'priority',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 0.5,
        }],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
          },
        },
      },
    });
  }
  
}

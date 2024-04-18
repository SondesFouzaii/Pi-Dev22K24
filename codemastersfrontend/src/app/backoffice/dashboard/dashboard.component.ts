import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, Tooltip, Legend, ArcElement } from 'chart.js';
import { DashboardService } from 'src/app/services/dashboardservice/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pageTitle: string = "Dashboard";
  totalTeams: number = 0;
  totalUsersInTeams: number = 0;
  totalProjectsInTeams: number = 0;
  public genderChart!: Chart; // This will hold our chart instance

  constructor(private dashboardService: DashboardService) {
    Chart.register(Tooltip, Legend, ArcElement);
  }

  ngOnInit(): void {
    this.dashboardService.getTotalTeams().subscribe(data => this.totalTeams = data);
    this.dashboardService.getTotalUsersInTeams().subscribe(data => this.totalUsersInTeams = data);
    this.dashboardService.getTotalProjectsInTeams().subscribe(data => this.totalProjectsInTeams = data);

    this.dashboardService.getGenderStats().subscribe({
      next: (data) => {
        this.createGenderChart(data);
      },
      error: (error) => console.error('Error fetching gender stats:', error)
    });

    
  }

  createGenderChart(data: any[]): void {
    const ctx = document.getElementById('genderChart') as HTMLCanvasElement;
    this.genderChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.teamName),
        datasets: [{
          label: 'Male',
          data: data.map(item => item.maleCount),
          backgroundColor: 'blue',
          stack: 'Stack 0'
        }, {
          label: 'Female',
          data: data.map(item => item.femaleCount),
          backgroundColor: 'pink',
          stack: 'Stack 0'
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        },
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true,
          }
        }
      }
    });
  }

  
}

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TeamService, TeamStats } from 'src/app/services/teamservice/team.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  teams: TeamStats[] = [];
  

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    console.log('ngOnInit started');
    this.teamService.getTeamStats().subscribe({
      next: (data) => {
        this.teams = data
      },
      error: (error) => {
        console.error('Error fetching team stats:', error)
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.teams.length > 0) {
      this.createChart();
    }
  }

  createChart(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.teams.map(team => team.name),
          datasets: [{
            label: 'Number of Users',
            data: this.teams.map(team => team.users),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }, {
            label: 'Number of Projects',
            data: this.teams.map(team => team.projects),
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Context not available for the chart.');
    }
  }
}

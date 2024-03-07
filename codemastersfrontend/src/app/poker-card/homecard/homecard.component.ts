import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { CardService } from 'src/app/services/card.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-homecard',
  templateUrl: './homecard.component.html',
  styleUrls: ['./homecard.component.scss']
})
export class HomecardComponent implements OnInit{
  images = [
    { id: 1, valeur: 1, image: '../../../../assets/assets_card/cartes/A-C.png' },
    { id: 2, valeur: 2, image: '../../../../assets/assets_card/cartes/2-C.png' },    
    { id: 3, valeur: 3, image: '../../../../assets/assets_card/cartes/3-C.png' },
    { id: 4, valeur: 4, image: '../../../../assets/assets_card/cartes/4-C.png' },
    { id: 5, valeur: 5, image: '../../../../assets/assets_card/cartes/5-C.png' },    
    { id: 6, valeur: 6, image: '../../../../assets/assets_card/cartes/6-C.png' },
    { id: 7, valeur: 7, image: '../../../../assets/assets_card/cartes/7-C.png' },
    { id: 8, valeur: 8, image: '../../../../assets/assets_card/cartes/8-C.png' },    
    { id: 9, valeur: 9, image: '../../../../assets/assets_card/cartes/9-C.png' },
    { id: 10, valeur: 10, image: '../../../../assets/assets_card/cartes/10-C.png' },
    
  ] 

  tasks: Task[] = [];
  constructor(private Cardservice: CardService,private router: Router,private httpClient: HttpClient) {}
  getTasks(): void {
    this.Cardservice.getTasks()
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }
  ngOnInit(): void {
    this.getTasks();
  }
  handleImageClick(valeur: number) {
    console.log("Valeur de l'image cliquée :", valeur);
    // Vous pouvez également effectuer d'autres actions avec la valeur de l'image
  }
  start() {
    this.router.navigate(['/homecard']);
  }
  goBack() {
    window.history.back();
  }
  navigateToViewTheme() {
    this.router.navigate(['/showcard']);
  }
  navigateToshowcards(taskId:number) {
    this.router.navigate(['card/showcard/',taskId]);
    // this.router.navigate(['/card']);
  }
 

 

}

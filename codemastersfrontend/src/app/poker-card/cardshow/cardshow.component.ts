import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CardService } from 'src/app/services/card.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { HttpClient, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-cardshow',
  templateUrl: './cardshow.component.html',
  styleUrls: ['./cardshow.component.scss']
})
export class CardshowComponent {
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

 // tasks: Task[] = [];
  tasks: Task[] | null = null;
  selectedCardValue: number | null = null;
  constructor(private Cardservice: CardService,private router: Router,private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    ) { }

  handleImageClick(valeur: number) {
    console.log("Valeur de l'image cliquée :", valeur);
    this.addCardToTask(valeur);
    this.selectedCardValue = valeur;
    // Vous pouvez également effectuer d'autres actions avec la valeur de l'image
  }

  assignCardValueToTask() {
    if (this.selectedCardValue !== null) {
      const taskId = this.activatedRoute.snapshot.params['taskId'];
      this.Cardservice.addCardvalueToTask( this.selectedCardValue,taskId).subscribe(()=>{
        //ng sthis.tasks = tasks;
        console.log('Valeur de la carte assignée avec succès à la tâche:', this.selectedCardValue);
        this.selectedCardValue = null; // Réinitialiser la valeur sélectionnée après l'assignation
      }, error => {
        console.error('Erreur lors de l\'assignation de la valeur de la carte à la tâche:', error);
      });
    }
  }

  // addCardToTask(cardValue: number) {
  //   // Récupérer l'ID de la tâche depuis l'URL ou d'où vous le stockez
  //   const taskId = this.activatedRoute.snapshot.params['task-id'];
    
  //   // Appel à la méthode du service pour ajouter la valeur de l'image à la tâche
  //   this.Cardservice.addCardvalueToTask(taskId, cardValue).subscribe(tasks => {
  //     // Mettre à jour la liste des tâches si nécessaire
  //     this.tasks = tasks;
  //   });
  addCardToTask(cardValue: number) {
    const taskId = this.activatedRoute.snapshot.params['taskId'];

    // Appel à la méthode du service pour ajouter la valeur de l'image à la tâche
    this.Cardservice.addCardvalueToTask(cardValue, taskId).subscribe(() => {
      // Mettre à jour la liste des tâches si nécessaire
      this.getTasks();
    }, error => {
      // Gérer les erreurs ici
      console.error('Error adding card value to task:', error);
    });

  }

  getTasks(): void {
    this.Cardservice.getTasks()
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }
  backnavigate(){
    this.router.navigate(['/homecard']);

  }



}

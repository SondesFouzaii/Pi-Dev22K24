import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'src/app/models/card';
import { Session } from 'src/app/models/session';
import { CardService } from 'src/app/services/card.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  themes = [
      { id: 1, name: 'Theme 1', image: '../../../assets/assets_BackOffice/cardassets/img/theme1.jpg' },
      { id: 2, name: 'Theme 2', image: '../../../assets/assets_BackOffice/cardassets/img/theme1.jpg' },    
      { id: 3, name: 'Theme 3', image: '../../../assets/assets_BackOffice/cardassets/img/theme1.jpg' },
    ] 

    
  cards: Card[] | null = null;
  searchTerm: string = '';
  cardForm: FormGroup;
  selectedCard: Card | null = null;
  edit_cardForm!: FormGroup;


  sessions: Session[] = [];



  constructor(private Cardservice: CardService, private fb: FormBuilder,private httpClient: HttpClient) {
    // Initialiser le formulaire réactif dans le constructeur
    this.cardForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      themeId: ['', Validators.required],
      sessionId: ['', Validators.required]
    });

    this.edit_cardForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      themeId: ['', Validators.required],
      sessionId: ['', Validators.required]


    })
  }
  //upload image area 
  selectedFile: File | null = null;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string= '';
  imageName: any;

  public onFileChanged(event: Event) {

    this.selectedFile = (event.target as HTMLInputElement).files![0];

  }

  onUpload() {
    if (this.selectedFile) { // Vérification que this.selectedFile n'est pas null
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
      this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        });
    } else {
      // Gérer le cas où this.selectedFile est null
      console.error('Aucun fichier sélectionné.');
    }
  }
  


  getImage() {

    //Make a call to Sprinf Boot to get the Image Bytes.

    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)

      .subscribe(

        res => {

          this.retrieveResonse = res;

          this.base64Data = this.retrieveResonse.picByte;

          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

        }

      );

  }
  ngOnInit(): void {
    this.getCards();
    //this.getThemes();
    this.getsession();
  }
  getsession(): void {
    this.Cardservice.getsession().subscribe(sessions => {
      this.sessions = sessions;
    });
  }
  getCards(): void {
    this.Cardservice.getCards()
      .subscribe((cards: Card[]) => {
        this.cards = cards;
      });
  }

  searchCards(): void {
    if (this.searchTerm.trim() !== '') {
      this.Cardservice.searchCardsByTitle(this.searchTerm)
        .subscribe((cards: Card[]) => {
          this.cards = cards;
        });
    } else {
      this.getCards();
    }
  }

  onDeleteCard(CardId: number): void {
    this.Cardservice.deleteCard(CardId).subscribe(
      () => {
        console.log('Card supprimé avec succès');
        this.searchCards();
      },
      error => {
        console.error('Erreur lors de la suppression du Card : ', error);
      }
    );
  }

  onSubmit(): void {
    if (this.cardForm.valid) {
      const formData = { ...this.cardForm.value };



      // Appeler le service pour ajouter le card avec les données du formulaire
      this.Cardservice.addCard(formData).subscribe(
        (response) => {
          console.log('card ajouté avec succès');
          // Réinitialiser le formulaire après l'ajout
          this.cardForm.reset();
          // Rafraîchir la liste des cards
          this.searchCards();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du card : ', error);
        }
      );
    } else {
      // Afficher des messages d'erreur si le formulaire est invalide
      // Par exemple, marquer les champs comme touchés pour afficher les messages d'erreur
      Object.values(this.cardForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }





  onEdit() {
    if (this.selectedCard) {
      // Associer les valeurs du formulaire aux propriétés de la tâche sélectionnée
      this.selectedCard.name = this.edit_cardForm.value.name;
      this.selectedCard.image = this.edit_cardForm.value.image;


      // Appeler la méthode de service pour modifier la tâche
      this.Cardservice.modifyCard(this.selectedCard).subscribe(
        data => {
          console.log(data);
          // Réinitialiser le formulaire après la soumission réussie
          this.edit_cardForm.reset();
          // Réinitialiser la tâche sélectionnée
          this.selectedCard = null;
        },
        error => console.log(error)
      );
    } else {
      // Gérez les cas où le formulaire n'est pas valide ou aucun selectedSprint
      console.log('Le formulaire n\'est pas valide ou aucune tâche sélectionnée.');
    }

  }

  card(card: Card) {
    this.selectedCard = card;
    this.edit_cardForm.patchValue({
      name: card.name,
      image: card.image

    });
  }
  selectTheme(themeId: number) {
    this.cardForm.patchValue({
      themeId: themeId
    });
  }

  selectSession(sessionId: number) {
    this.cardForm.patchValue({
      sessionId: sessionId
    });
  }
  openCardEdit(card: Card) {
    this.selectedCard = card;
    this.edit_cardForm.patchValue({
      name: card.name,
      image: card.image
    });
  }

}

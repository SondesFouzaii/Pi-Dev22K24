import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sprint-service.service';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnInit {

  sprints: Sprint[] | null = null;
  searchTerm: string = '';
  sprintForm: FormGroup; 
  selectedSprint: Sprint | null = null;
  edit_sprintForm!:FormGroup;
  sprintExistError = false;
  dateCheckError=false;

  constructor(private sprintService: SprintService, private fb: FormBuilder) {
    // Initialiser le formulaire réactif dans le constructeur
    this.sprintForm = this.fb.group({
      title: ['', Validators.required],
      velocity: [''],
      retrospective: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['PLANNED', Validators.required]
    }, { validators: this.dateValidator });

    this.edit_sprintForm = this.fb.group({
      title: ['', Validators.required],
      velocity: [''],
      retrospective: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['PLANNED', Validators.required]
    }, { validators: this.dateValidator });
  }

  ngOnInit(): void {
    this.getSprints();
  }

  dateValidator(formGroup: FormGroup) {

    const startDateControl = formGroup.get('startDate');
    const endDateControl = formGroup.get('endDate');
  
    if (startDateControl && endDateControl) {
        const startDate = startDateControl.value;
        const endDate = endDateControl.value;
  
        if (startDate && endDate && startDate >= endDate) {
            endDateControl.setErrors({ endDateBeforeStartDate: true });
            // Retourne un objet avec une erreur pour indiquer que la date de fin est antérieure à la date de début
            this.dateCheckError=true;
            return { endDateBeforeStartDate: true };
        } else {
            endDateControl.setErrors(null);
            return null;
        }
    }
  
    // Ajout d'un retour par défaut si aucune des conditions ci-dessus n'est remplie
    return null;
}

  
  

  getSprints(): void {
    this.sprintService.getSprints()
      .subscribe((sprints: Sprint[]) => {
        this.sprints = sprints;
      });
  }

  searchSprints(): void {
    if (this.searchTerm.trim() !== '') {
      this.sprintService.searchSprintsByTitle(this.searchTerm)
        .subscribe((sprints: Sprint[]) => {
          this.sprints = sprints;
        });
    } else {
      this.getSprints();
    }
  }

  onDeleteSprint(sprintId: number): void {
    this.sprintService.deleteSprint(sprintId).subscribe(
      () => {
        console.log('Sprint supprimé avec succès');
        this.searchSprints();
      },
      error => {
        console.error('Erreur lors de la suppression du sprint : ', error);
      }
    );
  }

  onSubmit(): void {
    if (this.sprintForm.valid) {
      const formData = { ...this.sprintForm.value };

      // Formater les dates au format 'yyyy-MM-dd'
      const startDate = this.formatDate(formData.startDate);
      const endDate = this.formatDate(formData.endDate);

      // Créer un nouvel objet Sprint avec les dates formatées
      const sprintData = { ...formData, startDate, endDate };


      // Appeler le service pour ajouter le sprint avec les données du formulaire
      this.sprintService.addSprint(sprintData).subscribe(
        (response) => {
          console.log('Sprint ajouté avec succès');
          // Réinitialiser le formulaire après l'ajout
          this.sprintForm.reset();
          // Rafraîchir la liste des sprints
          this.searchSprints();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du sprint : ', error);
          // Activer l'alerte en cas d'erreur
          this.sprintExistError = true;
        }
      );
    } else {
      // Afficher des messages d'erreur si le formulaire est invalide
      // Par exemple, marquer les champs comme touchés pour afficher les messages d'erreur
      Object.values(this.sprintForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
  

  private formatDate(date: string): string {
    const [day, month, year] = date.split('-');
    return `${day}-${month}-${year}`;
  }


  onEdit() {
    if (this.selectedSprint) {
      // Associer les valeurs du formulaire aux propriétés de la tâche sélectionnée
      this.selectedSprint.title = this.edit_sprintForm.value.title;
      this.selectedSprint.velocity = this.edit_sprintForm.value.velocity;
      this.selectedSprint.retrospective = this.edit_sprintForm.value.retrospective;
      this.selectedSprint.status=this.edit_sprintForm.value.status;
      this.selectedSprint.startDate = this.edit_sprintForm.value.startDate;
      this.selectedSprint.endDate = this.edit_sprintForm.value.endDate;
  
      // Appeler la méthode de service pour modifier la tâche
      this.sprintService.modifySprint(this.selectedSprint).subscribe(
        data => {
          console.log(data);
          // Réinitialiser le formulaire après la soumission réussie
          this.edit_sprintForm.reset();
          // Réinitialiser la tâche sélectionnée
          this.selectedSprint = null;
        },
        error => console.log(error)
      );
    } else {
      // Gérez les cas où le formulaire n'est pas valide ou aucun selectedSprint
      console.log('Le formulaire n\'est pas valide ou aucune tâche sélectionnée.');
    }
    
  }

  openSprintEdit(sprint: Sprint){
    this.selectedSprint = sprint;
    this.edit_sprintForm.patchValue({
      title: sprint.title,
      velocity: sprint.velocity,
      status:sprint.status,
      retrospective: sprint.retrospective,
      startDate: sprint.startDate,
      endDate:sprint.endDate
    });
  }

  
  
}
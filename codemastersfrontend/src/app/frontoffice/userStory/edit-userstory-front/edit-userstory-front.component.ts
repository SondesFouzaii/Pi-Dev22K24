import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserstoryService } from 'src/app/services/serviceUserstory/userstory.service';

@Component({
  selector: 'app-edit-userstory-front',
  templateUrl: './edit-userstory-front.component.html',
  styleUrls: ['./edit-userstory-front.component.scss']
})
export class EditUserstoryFrontComponent implements OnInit {
  userStoryForm!: FormGroup;
  userStoryId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private userStoryService: UserstoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userStoryId = this.route.snapshot.params['id'];

    this.userStoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      estimation: ['', Validators.required]
    });

    this.loadUserStory();
  }

  loadUserStory() {
    this.userStoryService.retrieveuserstory(this.userStoryId).subscribe(
      userStory => {
        this.userStoryForm.patchValue({
          name: userStory.name,
          description: userStory.description,
          priority: userStory.priority,
          estimation: userStory.estimation
        });
      },
      error => {
        console.error('Error loading user story:', error);
      }
    );
  }

  onSubmit() {
    if (this.userStoryForm.valid) {
      const userStoryData = this.userStoryForm.value;
      this.userStoryService.modifyuserstory(this.userStoryId, userStoryData).subscribe(
        response => {
          console.log('User story modified successfully:', response);
          this.loadUserStory();
          this.router.navigate(['/listUserstoryFront']); 
          // Rediriger vers la liste des histoires utilisateurs après la modification
        },
        error => {
          console.error('Error modifying user story:', error);
        }
      );
    }
    this.router.navigate(['/listUserstoryFront']);
  }
}

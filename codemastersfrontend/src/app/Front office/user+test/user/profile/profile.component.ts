import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user+test/user';
import { UserService } from 'src/app/services/test+user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  

  id!: number;
  user!: User;
  imgtest!: any ;
 
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private uservice: UserService, private route: Router) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getUser();
    });
  }

  getUser(): void {
    this.uservice.getUser(this.id).subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  updatePhoto(): void {
    this.uservice.modifierImage(this.id, this.imgtest).subscribe();
    
  }

  handleFileInput(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      this.imgtest = file.name;
    }
  }
}

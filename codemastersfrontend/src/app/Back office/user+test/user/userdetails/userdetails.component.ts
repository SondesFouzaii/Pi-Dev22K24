import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user+test/user';
import { UserService } from 'src/app/services/test+user/user.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent {



  id!: number;
  user!: User;


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

  delete(id: number): void {
    console.log("test");
    this.uservice.deleteUser(id).subscribe(
      () => {
        this.router.navigate(['/admin/ut/user']).then(() => {
          // Reload the page
          location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}

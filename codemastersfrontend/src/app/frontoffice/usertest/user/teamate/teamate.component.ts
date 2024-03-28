import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teamate',
  templateUrl: './teamate.component.html',
  styleUrls: ['./teamate.component.scss']
})
export class TeamateComponent implements OnInit{
  id!: number;
  user!: User;
  value = 'Clear me';

  constructor(private activatedRoute: ActivatedRoute, private uservice: UserService) {
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

  openVideoCall(): void {
    const width = 500;
    const height = 500;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    
    window.open('http://192.168.1.105:4200/call/LOC9N4lf', 'NewWindow', `width=${width}, height=${height}, left=${left}, top=${top}`);
  }

}

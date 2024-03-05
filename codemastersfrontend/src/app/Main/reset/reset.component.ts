import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/test+user/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit{
email!:string;

ngOnInit(): void {
  
}

constructor( private userser: UserService){}

gogo(){
  this.resetPassword(this.email);
}

resetPassword(email: string) {
  this.userser.restPasswd(email).subscribe(
    response => {
      console.log(response); // Handle the response as needed
    },
    error => {
      console.log(error); // Handle the error as needed
    }
  );
}
}

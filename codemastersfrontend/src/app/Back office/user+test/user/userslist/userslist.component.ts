import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user+test/user';
import { UserService } from 'src/app/services/test+user/user.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit{
  emailsearch: string='.';
  isempty:boolean=this.emailsearch!=='';
  @Output() getAllUsersEvent = new EventEmitter<void>();
  selectedRole!:string;
  Rolelist:String[]=[]
  displayrole:boolean[]=[];
  newrole: string[]=[];
  cr(ii:number){
    this.displayrole[ii]=!this.displayrole[ii];
  }
  constructor(private uservice:UserService) { }
  ngOnInit(): void {
    this.roleLista();
    this.getallusers();
    this.uservice.getUsers().subscribe(users => {
      this.users = users;
      this.displayrole = new Array(users.length).fill(true);
    });
  }

  public users!:User[];
  public getallusers(): void{
    this.uservice.getUsers().subscribe(
      (response:User[])=>{
        this.users=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

    deleteMyObject(userId: number ){
    this.uservice.deleteUser(userId).subscribe();
    }

    updateb(user:User){
      //user.name=this.newname;
      this.uservice.updateUser(user).subscribe();
    }
    
    addu(user:User){
     // user=this.app;
     // user.name=this.newb
      this.uservice.addSimpleUser(user).subscribe();
    }
    bd(id:number){
      //user.name=this.newname;
      this.uservice.bloquage(id).subscribe(() => {
        // Update brands array after addition
        this.getallusers();
      });
    }

    modifierrole(id:number,role:string,i:number){
      //user.name=this.newname;
      this.uservice.modifierRole(id,role).subscribe(() => {
        this.displayrole[i] = true;
        this.getallusers();
      });
    }

    roleList: string[] = [];

roleLista() {
  this.uservice.getRoles().subscribe(
    (response: string[]) => {
      this.roleList = response;
    },
    (error) => {
      console.error('Error fetching roles:', error);
    }
  );
}
}

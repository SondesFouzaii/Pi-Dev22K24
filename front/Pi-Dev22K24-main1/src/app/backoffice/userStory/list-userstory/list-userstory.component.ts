
import { Component } from '@angular/core';
import { UserstoryService } from 'src/app/services/serviceUserstory/userstory.service';

import { Router } from '@angular/router';
import { Userstory } from 'src/app/models/userstory';
@Component({
  selector: 'app-list-userstory',
  templateUrl: './list-userstory.component.html',
  styleUrls: ['./list-userstory.component.scss']
})
export class ListUserstoryComponent {
  userstorys: Userstory[] = [];

  constructor(private userstoryService: UserstoryService ,  private router: Router,
) { }

  ngOnInit(): void {
    this.getuserstorys();
  }

  getuserstorys(): void {
    this.userstoryService.retrieveAlluserstorys()
      .subscribe(userstorys => this.userstorys = userstorys);
  }
  // details(userstoryID : number){
  //  // this.router.navigate(['/detailuserstory'], userstoryID);
  // }
  // delete(userstory: Userstory) {
  //   this.userstoryService.removeuserstory(userstory.id).subscribe(() => {
  //     this.userstorys = this.userstorys.filter((f: Userstory) => f.id !== userstory.id);
  //    // this.openSnackBar('userstory deleted successfully', 'close');
  //   });
  // }
  
  delete(userstory: Userstory) {
    if (userstory && userstory.id !== undefined) {
      this.userstoryService.removeuserstory(userstory.id).subscribe(() => {
        this.userstorys = this.userstorys.filter((f: Userstory) => f.id !== userstory.id);
      });
    } 
  }
  
  
 

  update(id: any) {
    this.router.navigate(['/editUserstory', id]);
  }

  details(id: any) {
    this.router.navigate(['/detailUserstory', id]);
  }
}
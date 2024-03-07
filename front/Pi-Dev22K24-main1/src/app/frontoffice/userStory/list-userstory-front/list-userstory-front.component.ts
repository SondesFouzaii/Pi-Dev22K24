
import { Component } from '@angular/core';
import { UserstoryService } from 'src/app/services/serviceUserstory/userstory.service';
import { Router } from '@angular/router';
import { Userstory } from 'src/app/models/userstory';
@Component({
  selector: 'app-list-userstory-front',
  templateUrl: './list-userstory-front.component.html',
  styleUrls: ['./list-userstory-front.component.scss']
})
export class ListUserstoryFrontComponent {
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

  delete(userstory: Userstory) {
    if (userstory && userstory.id !== undefined) {
      this.userstoryService.removeuserstory(userstory.id).subscribe(() => {
        this.userstorys = this.userstorys.filter((f: Userstory) => f.id !== userstory.id);
        this.getuserstorys();
      });
    } 

  }
  
  update(id: any) {
    this.router.navigate(['/editUserstoryFront', id]);
  }

  details(id: any) {
    this.router.navigate(['/detailUserstoryFront', id]);
  }
}
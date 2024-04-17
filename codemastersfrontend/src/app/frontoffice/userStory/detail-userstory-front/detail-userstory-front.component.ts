import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserstoryService } from 'src/app/services/serviceUserstory/userstory.service';
@Component({
  selector: 'app-detail-userstory-front',
  templateUrl: './detail-userstory-front.component.html',
  styleUrls: ['./detail-userstory-front.component.scss']
})
export class DetailUserstoryFrontComponent implements OnInit{
  userstory!:any;
  constructor(private route: ActivatedRoute, private userstoryService: UserstoryService) {}
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const userstoryID = +idParam; 
        this.userstoryService.retrieveuserstory(userstoryID).subscribe(userstory=> {
          this.userstory = userstory; 
        });
      } else {
       
      }
    });
  }
}


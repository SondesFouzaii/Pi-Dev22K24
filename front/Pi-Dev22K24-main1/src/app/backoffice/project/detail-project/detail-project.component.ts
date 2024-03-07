import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/serviceProjet/project.service';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss']
})
export class DetailProjectComponent implements OnInit{
  project!:any;
  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const projectID = +idParam; 
        this.projectService.retrieveProject(projectID).subscribe(project=> {
          this.project = project; 
        });
      } else {
       
      }
    });
  }
}

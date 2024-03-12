import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{
  constructor(private quizservice:QuizService) { }
  ngOnInit(): void {
   
this.getalltests();

  }
  public tests!:Test[];
  public getalltests(): void{
    this.quizservice.getTests().subscribe(
      (response:Test[])=>{
        this.tests=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  active(id:number){
    this.quizservice.activateanactivate(id).subscribe(() => {
      // just refresh
      this.getalltests();
    });
  }

}

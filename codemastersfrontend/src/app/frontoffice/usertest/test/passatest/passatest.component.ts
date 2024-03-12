import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Test } from 'src/app/models/test';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-passatest',
  templateUrl: './passatest.component.html',
  styleUrls: ['./passatest.component.scss']
})
export class PassatestComponent implements OnInit {
  constructor(private quizservice: QuizService, private activateroute: ActivatedRoute) { }
  showWarning: boolean = false;
  isQuizStarted: boolean = false;
  currentQuestionNumber: number = 0;
  remainingTime: number = 10;
  timer = interval(1000);
  subscription: Subscription[] = [];
  correctAnswerCount: number = 0;
  isQuizEnded: boolean = false;
  id!: number;
  ngOnInit(): void {
    this.id = this.activateroute.snapshot.params['id']
    this.gettestbyid();

  }


  finish() {
    this.isQuizEnded = true;
    this.isQuizStarted = false;

  }

  selectoption(option: any) {
    if(option.iscorrect){
      this.correctAnswerCount++;
    }
    option.isSelected = true;
  }
  isOptionSelectd(options: any) {
    const selectioncount = options.filter((m: any) => m.isSelected == true);
    if (selectioncount == 0) {
      return false;
    } else {
      return true;
    }
  }

  nextquestion() {
    if (this.currentQuestionNumber < this.test.questions.length - 1) {
      this.currentQuestionNumber++;
      this.remainingTime = 10;
    } else {
      this.subscription.forEach(element => {
        element.unsubscribe();
      })
    }
  }


  startQuiz() {
    this.showWarning = false;
    this.isQuizStarted = true;
    this.subscription.push(this.timer.subscribe(res => {
      if (this.remainingTime != 0) {
        this.remainingTime--;
      }
      if (this.remainingTime == 0) {
        this.nextquestion();
        this.remainingTime = 10;
      }
    })
    )
  }

  //get the test by id 
  public test!: Test;
  gettestbyid() {
    this.quizservice.getatest(this.id).subscribe(
      (response: Test) => { this.test = response; },
      (error: HttpErrorResponse) => { alert(error.message); });
  }
  //end off get the test by id 
}

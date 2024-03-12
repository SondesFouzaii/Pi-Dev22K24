import { Component } from '@angular/core';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-importquiz',
  templateUrl: './importquiz.component.html',
  styleUrls: ['./importquiz.component.scss']
})
export class ImportquizComponent {
  constructor(private quizservice: QuizService){}

  importjson(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const fileContent = e.target.result;
      const parsedJson = JSON.parse(fileContent);
      const quiz: Quiz = Object.assign(new Quiz(), parsedJson);

      console.log('this is the end',quiz);
      this.quizservice.addQuiz(quiz).subscribe(
        () => {
          console.log('Quiz added successfully');
        },
        (error) => {
          console.error('Failed to add quiz:', error);
        }
      );
    };

    reader.readAsText(file);
  }
}

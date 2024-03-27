import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat-gpt',
  templateUrl: './chat-gpt.component.html',
  styleUrls: ['./chat-gpt.component.scss']
})
export class ChatGPTComponent implements OnInit {
  message = [
    { role: "system", content: "You are a helpful assistant." }
  ];
  content = [
    {
      role: "user",
      parts: [{ "text": "hello may name is houssem" }]
    }
  ];
  result: any;
  resultgoogle: any;
  queryFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  ngOnInit(): void {
    this.queryFormGroup = this.fb.group({
      query: this.fb.control("")
    });
  }

  askGPT() {
    let url = "https://api.openai.com/v1/chat/completions";
    let httpHeaders = new HttpHeaders()
      .set("Authorization", "Bearer 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");
    this.message.push({ role: "user", content: this.queryFormGroup.value.query })
    let payload = {
      model: "gpt-3.5-turbo-instruct",
      messages: this.message,
      //"Content-Type": "application/json"
    };

    this.http.post(url, payload, { headers: httpHeaders })
      .subscribe({
        next: (resp) => {
          this.result = resp;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  //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
  googleAI() {
    let url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=";
    let API_KEY = "AIzaSyAOqrAtNCMKFnH9NE7Et1WuZO-q5erDFUA";
  
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("x-goog-api-key", API_KEY);
  
    // Create a new array of content with the user's query
    let newContent = [
      {
        role: "user",
        parts: [{ text: this.queryFormGroup.value.query }]
      }
    ];
  
    let payload = {
      contents: newContent
    };
  
    this.http.post(url + API_KEY, payload, { headers: headers })
      .subscribe({
        next: (resp) => {
          this.resultgoogle = resp;
          console.log(resp);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  

}

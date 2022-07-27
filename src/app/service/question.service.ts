import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient)  { }

  getQuestionJsonFile() {
    console.log("question-service.ts:getQuestionJsonFile()");
    return this.http.get<any>("assets/data/Testing_HTML_Knowledge.json");
  }
}

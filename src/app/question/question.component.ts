import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public isTestFinished : Boolean = false;
  public infoImg : String = "assets/img/userquestioned.png";
  public successImg : String = "assets/img/success.png";
  public username : String = "";
  public questions : any = [];
  public currentQuestion : number = 0;
  public currentTimer : number = 60;  // 60 sec
  public userPoints : number = 0;
  public userCorrectAnswer : number = 0;
  public userWrongAnswer : number = 0;
  public progress : String = "0";

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    console.log("question.component.ts:ngOnInit()");
    this.username = localStorage.getItem("username")!;
    this.getAllQuestions();
  }

  getAllQuestions() {
    console.log("question.component.ts:getAllQuestions()");
    this.questionService.getQuestionJsonFile().subscribe(res=>{
      // console.log(res);
      // console.log(res.questions);
      this.questions = res.questions;
    })
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  prevQuestion() {
    this.currentQuestion--;
  }

  answer(question:number, option:any) {
    console.log("question.component.ts:answer("+question+")"+", "+option.toString());
    let isCorrect : Boolean = false;
    if (option.correct != undefined)
      isCorrect = JSON.parse(option.correct);
    console.log("answer: option.correct="+isCorrect);
    if (isCorrect) {
      this.userPoints += 5;
      this.userCorrectAnswer++;
      console.log("answer: correct "+this.userCorrectAnswer+"/"+this.userPoints);
    } else {
      this.userPoints -= 10;
      this.userWrongAnswer++;
      console.log("answer: uncorrect "+this.userCorrectAnswer+"/"+this.userPoints);
    }
    setTimeout(() => {
      this.currentQuestion++;
      this.resetTimer();
      this.getProgress();
    }, 1000);
    if(question === this.questions.length) {
      this.isTestFinished = true;
      this.infoImg = "assets/img/welldone.png";
      if (this.userCorrectAnswer >= (this.questions.length*0.8)) {
        this.successImg = "assets/img/success.png";
      } else {
        this.successImg = "assets/img/failed.png";
      }
      this.stopTimer();
      console.log("answer: final state "+this.userCorrectAnswer+"/"+this.userPoints+"/"+this.successImg);
    }
  }

  startTimer() {

  }

  stopTimer() {
    this.currentTimer=0;
  }

  resetTimer() {
    this.stopTimer()
    this.currentTimer=60;
    this,this.startTimer();
  }

  resetTest() {
    this.resetTimer();
    this.getAllQuestions();
    this.userPoints = 0;
    this.currentTimer = 60;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  getProgress() {
    this.progress = ((this.currentQuestion/this.questions.length)*100).toString();
    return this.progress;
  }
}

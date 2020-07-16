import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz-service/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  emailValue: any;
  questionValue: any = {};
  question: any;
  isEmailInput: boolean = true;
  isQuestion: boolean = false;
  isOtherAns: boolean = false;
  isFinalSubmit: boolean = false;
  nextQuestionId: number;
  otherAns: any;
  answers: any = [];

  constructor(
    private quizService: QuizService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  contactOnSubmit() {
    this.getQuestions();
  }

  questionOnSubmit() {
    this.nextQuestionId = this.questionValue.question.next_question;

    const answer = {
      id: this.question.id,
      question: this.question.question,
      optionId: this.questionValue.question.id,
      option: this.questionValue.question.question_option,
      other: this.questionValue.other
    }

    this.answers.push(answer);

    if (this.nextQuestionId == 0) {
      this.submitAnswer()
    } else {
      this.getQuestions();
    }
  }

  changeOptions() {
    const option = this.questionValue.question.question_option;
    const words = option.split(" ");

    if (words[0] == "Other") {
      this.isOtherAns = true;
    } else {
      this.isOtherAns = false
    }
  }

  getQuestions() {
    this.quizService.getQuestion(this.emailValue, this.nextQuestionId).subscribe(response => {
      if (response.status) {
        this.isOtherAns = false;
        this.isEmailInput = false;
        this.isQuestion = true;
        this.question = response.data;

      } else {
        this.openSnackBar(response.message)
      }
    }, err => {
      this.openSnackBar("something went to wrong")
    })
  }

  submitAnswer() {
    const data = {
      email: this.emailValue,
      answers: this.answers
    }

    this.quizService.postAnswers(data).subscribe(response => {
      if (response.status) {
        this.isEmailInput = false;
        this.isQuestion = false;
        this.isOtherAns = false;
        this.isFinalSubmit = true;
      } else {

      }
    }, err => {
      this.openSnackBar("something went to wrong")
    })

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }
}

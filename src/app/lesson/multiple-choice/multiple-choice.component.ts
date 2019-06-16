import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { User } from '../../core/user';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {
  public currentQuestionNum = 0;
  public currentQuestion;
  public lessonQuestions: any;
  public user: User;
  public currentClass: string;
  public currentLesson: any;
  // probably should make it more clear what is question or answer or maybe not ;)
  public choices: {[key: number]: number};
  constructor(private lessonService: LessonService, private authService: AuthService) {
    // inject service to get componet
   }
// TODO: need to create a type for a multiple choice lesson
  ngOnInit() {
    this.authService.user.subscribe((user: User) => {
      this.user = user;
      this.currentLesson = this.user.currentLesson;
      this.currentClass = this.user.currentClass;
    });
   console.log(this.currentClass, '+++++++++++++++++++++');
   console.log(this.currentLesson, '======================');
  //  this.lessonService.getCurrentLesson.subscribe((data: JSON) =>
  //   this.lessonQuestions = data,
  //   this.currentQuestion = {
  //     question: this.lessonQuestions[this.currentQuestionNum]['question'],
  //     choices:  this.lessonQuestions[this.currentQuestionNum]['choices']
  // });
  }
  // get questions
// next question need to get after answer has been submited
  nextQuestion () {
    this.currentQuestionNum = ++this.currentQuestionNum;
    this.currentQuestion = {
      question: this.lessonQuestions[this.currentQuestionNum]['question'],
      choices:  this.lessonQuestions[this.currentQuestionNum]['choices']
    };
  }

  // might pass in function check answer to make this method more dynamic
  addAnswer(answerIndex: number) {
    this.choices[this.currentQuestionNum] = answerIndex;
  }


}

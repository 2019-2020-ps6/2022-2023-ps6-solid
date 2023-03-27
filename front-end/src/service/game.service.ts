import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quiz } from '../models/quiz.model';
import { Question } from "../models/question.model";
import { QUIZ_LIST } from "../mocks/quiz-list.mock";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public quizList = QUIZ_LIST;
  public _currentQuizIndex = 0;
  public _currentQuestionIndex = 0;
  public selectedQuizId: string | null = null;
  public quizQuestionsLength = 0;

  public quizList$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizList);
  public currentQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject(this.quizList[this.currentQuizIndex]);
  public currentQuestion$: BehaviorSubject<Question> = new BehaviorSubject(this.quizList[this.currentQuizIndex].questions[this.currentQuestionIndex]);

  constructor(private http: HttpClient) {
    this.retrieveQuizList();
  }

  get currentQuizIndex(): number {
    return this._currentQuizIndex;
  }

  set currentQuizIndex(index: number) {
    console.log("GameService.setCurrentQuizIndex()");
    this._currentQuizIndex = index;
    this.currentQuiz$.next(this.quizList[this._currentQuizIndex]);
    this.currentQuestionIndex = 0;
  }

  get currentQuestionIndex(): number {
    return this._currentQuestionIndex;
  }

  set currentQuestionIndex(index: number) {
    console.log("GameService.setCurrentQuestionIndex()");
    this._currentQuestionIndex = index;
    this.currentQuestion$.next(this.quizList[this.currentQuizIndex].questions[this._currentQuestionIndex]);
  }

  public retrieveQuizList(): void {
    console.log("GameService.retrieveQuizList()");
    this.quizList = QUIZ_LIST;
    this.quizList$.next(this.quizList);
    this.currentQuizIndex = 0;
    this.currentQuestionIndex = 0;
  }

  retrieveQuestions(quizId: string): void {
    console.log("GameService.retrieveQuestions()");
    const quiz = this.quizList.find(q => q.id === quizId);
    if (quiz) {
      this.currentQuizIndex = this.quizList.indexOf(quiz);
      this.currentQuestionIndex = 0;
      if (quiz.questions) {
        this.currentQuestion$.next(quiz.questions[this.currentQuestionIndex]);
        this.quizQuestionsLength = quiz.questions[0].answers.length;
        console.log(this.quizQuestionsLength+" size"); // Affiche la longueur de la liste des questions dans la console du navigateur
      }
    } else {
      console.log(`Le quiz avec l'identifiant ${quizId} n'a pas été trouvé.`);
    }
  }


  nextQuestion(): void {
    console.log("GameService.nextQuestion()");
    if (this.currentQuestionIndex < this.quizList[this.currentQuizIndex].questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      // si c'est la dernière question du quiz, on passe au quiz suivant
      console.log('Fin du QUIZ');
    }
  }

  previousQuestion(): void {
    console.log("GameService.previousQuestion()");
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
  selectAnswer(answerIndex: number): void {
    console.log("GameService - selectAnswer");
    this.quizList[this.currentQuizIndex].questions[this.currentQuestionIndex].selectedAnswerIndex = answerIndex;
    this.nextQuestion();
  }

  nextQuiz(): void {
    console.log("GameService - nextQuiz");
    if (this.currentQuizIndex < this.quizList.length - 1) {
      this.currentQuizIndex++;
      this.currentQuestionIndex = 0;
    } else {
// si c'est le dernier quiz, on affiche un message de fin de jeu ou on redirige vers la page d'accueil, etc.
      console.log('Fin du jeu');
    }
  }

  getQuizList(): Observable<Quiz[]> {
    console.log("GameService - getQuizList");
    return this.quizList$;
  }

  getQuiz(quizId: string): Observable<Quiz | undefined> {
    console.log("GameService - getQuiz");
    return this.quizList$.pipe(
      map((quizList: Quiz[]) => quizList.find((quiz: Quiz) => quiz.id === quizId))
    );
  }

  startGame(quizId: string): void {
    console.log("GameService - startGame");
    const quiz = this.quizList.find(q => q.id === quizId);
    if (quiz) {
      this.retrieveQuestions(quiz.id);
    } else {
      console.log(`Le quiz avec l'identifiant ${quizId} n'a pas été trouvé.`);
    }
  }
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Answer, Interpretation, Question, Quiz } from '../model';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss'],
})
export class QuizEditComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private store: AngularFirestore,
    private router: Router
  ) {}

  subs: Subscription[] = [];
  quiz: Quiz;
  editorOptions = { theme: 'vs-light', language: 'json' };

  ngOnInit(): void {
    this.subs.push(
      this.route.paramMap
        .pipe(
          map((params) => params.get('quizId')),
          switchMap((id) =>
            this.store
              .collection<Quiz>('quiz')
              .doc(id)
              .get()
              .pipe(map((doc) => ({ ...doc.data(), id })))
          )
        )
        .subscribe((quiz) => {
          this.quiz = quiz;
        })
    );
  }

  save(): void {
    this.store
      .collection<Quiz>('quiz')
      .doc(this.quiz.id)
      .set(this.quiz)
      .then(() => this.router.navigate(['']));
  }

  cloneQuestion(q: Question): void {
    this.quiz.questions.push({
      ...q,
      answers: [...q.answers.map((a) => ({ ...a }))],
    });
  }

  addQuestion(): void {
    this.quiz.questions.push({
      text: '',
      section: false,
      answers: [],
    });
  }

  deleteQuestion(q: Question): void {
    this.quiz.questions = this.quiz.questions.filter((x) => x.text !== q.text);
  }

  addAnwser(q: Question): void {
    this.quiz.questions
      .find((x) => x.text === q.text)
      .answers.push({ text: '', score: 0 });
  }

  addSection(): void {
    this.quiz.questions.push({
      text: '',
      section: true,
      answers: [],
    });
  }

  deleteAnswer(q: Question, a: Answer): void {
    const question = this.quiz.questions.find((x) => x.text === q.text);
    question.answers = question.answers.filter((ans) => ans.text !== a.text);
  }

  cloneAnswer(q: Question, a: Answer): void {
    const question = this.quiz.questions.find((x) => x.text === q.text);
    question.answers.push({ ...a });
  }

  addInterpretation(): void {
    this.quiz.interpretations.push({
      text: '',
      minScore: 0,
      maxScore: 0,
    });
  }

  deleteInterpretation(i: Interpretation): void {
    this.quiz.interpretations = this.quiz.interpretations.filter(
      (ints) => ints.text !== i.text
    );
  }

  cloneInterpretation(i: Interpretation): void {
    this.quiz.interpretations.push({ ...i });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

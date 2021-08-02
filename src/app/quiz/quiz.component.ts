import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Quiz, QuizResponse } from '../model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: AngularFirestore,
    private router: Router
  ) {}

  quiz: Quiz;
  scores: number[] = [];
  alreadySubmitted = false;

  controls: FormControl[];

  ngOnInit(): void {
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
        this.controls = this.quiz.questions.map((q) =>
          q.section ? null : new FormControl('', [Validators.required])
        );
      });
  }

  submit(): void {
    this.controls.forEach((c) => {
      if (!!c && !c.touched) {
        c.markAsTouched();
      }
    });
    if (localStorage.getItem(this.quiz.id) === 'submitted') {
      this.alreadySubmitted = true;
      return;
    }
    if (this.controls.every((c) => null == c || c.valid)) {
      localStorage.setItem(this.quiz.id, 'submitted');
      this.store
        .collection<QuizResponse>(`quiz/${this.quiz.id}/responses`)
        .add({
          timestamp: new Date(),
          items: this.controls.map((c, ix) => ({
            question: ix,
            answer: c ? Number(c.value) : 0,
          })),
        })
        .then(() =>
          this.router.navigate([
            'interpretation',
            this.quiz.id,
            {
              score: this.controls
                .filter((c) => !!c)
                .reduce((prev, curr) => prev + Number(curr.value), 0),
            },
          ])
        );
    }
  }
}

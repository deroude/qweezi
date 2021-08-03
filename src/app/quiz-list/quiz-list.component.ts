import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quiz } from '../model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit, OnDestroy {
  constructor(private store: AngularFirestore, private router: Router) {}

  quizList: Quiz[] = [];
  subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(
      this.store
        .collection<Quiz>('quiz')
        .valueChanges({ idField: 'id' })
        .subscribe((quizList) => {
          this.quizList = quizList;
        })
    );
  }

  clone(quiz: Quiz): void {
    this.store
      .collection<Quiz>('quiz')
      .add(quiz)
      .then((re) => console.log(re));
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { QuizResponse } from '../model';

@Component({
  selector: 'app-quiz-responses',
  templateUrl: './quiz-responses.component.html',
  styleUrls: ['./quiz-responses.component.scss'],
})
export class QuizResponsesComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private store: AngularFirestore) {}

  subs: Subscription[] = [];
  responses: QuizResponse[] = [];

  ngOnInit(): void {
    this.subs.push(
      this.route.paramMap
        .pipe(
          map((params) => params.get('quizId')),
          switchMap((id) =>
            this.store
              .collection<QuizResponse>(`quiz/${id}/responses`)
              .valueChanges()
          )
        )
        .subscribe((res) => {
          this.responses = res;
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

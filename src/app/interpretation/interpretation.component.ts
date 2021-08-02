import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Quiz } from '../model';

@Component({
  selector: 'app-interpretation',
  templateUrl: './interpretation.component.html',
  styleUrls: ['./interpretation.component.scss'],
})
export class InterpretationComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: AngularFirestore) {}

  score: number;
  interpretation: string;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap((params) => (this.score = Number(params.get('score')))),
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
        this.interpretation = quiz.interpretations.find(
          (variant) =>
            variant.minScore <= this.score && variant.maxScore >= this.score
        )?.text || 'You are an exception, no interpretation was found';
      });
  }
}

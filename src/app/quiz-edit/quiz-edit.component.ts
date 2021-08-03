import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Quiz } from '../model';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss'],
})
export class QuizEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: AngularFirestore,
    private router: Router
  ) {}

  quiz: Quiz;
  quizText: string;
  editorOptions = {theme: 'vs-light', language: 'json'};

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
        this.quizText = JSON.stringify(this.quiz);
      });
  }

  save(): void {
    this.store
      .collection<Quiz>('quiz')
      .doc(this.quiz.id)
      .set(this.quiz)
      .then(() => this.router.navigate(['']));
  }
}

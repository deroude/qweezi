import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterpretationComponent } from './interpretation/interpretation.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { HomeComponent } from './home/home.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizComponent } from './quiz/quiz.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { QuizResponsesComponent } from './quiz-responses/quiz-responses.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'list',
        component: QuizListComponent,
        canActivate: [AngularFireAuthGuard],
      },
      {
        path: 'edit/:quizId',
        component: QuizEditComponent,
        canActivate: [AngularFireAuthGuard],
      },
      {
        path: 'responses/:quizId',
        component: QuizResponsesComponent,
        canActivate: [AngularFireAuthGuard],
      },
    ],
  },
  { path: 'quiz/:quizId', component: QuizComponent },
  { path: 'interpretation/:quizId', component: InterpretationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

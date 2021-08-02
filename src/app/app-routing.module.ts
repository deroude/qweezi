import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterpretationComponent } from './interpretation/interpretation.component';
import { QuizComponent } from './quiz/quiz.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'quiz/:quizId', component: QuizComponent },
  { path: 'interpretation/:quizId', component: InterpretationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

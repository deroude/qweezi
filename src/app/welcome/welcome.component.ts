import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(public auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => this.router.navigate(['list']));
  }
  logout(): void {
    this.auth.signOut().then(() => this.router.navigate(['']));
  }
}

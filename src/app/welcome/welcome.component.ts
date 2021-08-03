import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(public auth: AngularFireAuth) {}

  ngOnInit(): void {}

  login(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout(): void {
    this.auth.signOut();
  }

}

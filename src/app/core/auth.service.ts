import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {Md5} from 'ts-md5/dist/md5';
import * as firebase from 'firebase/app';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User>;
  state: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
    this.afAuth.authState.subscribe(data => {
      this.state = data;
    });
  }

  get authenticated(): boolean {
    return this.state !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.state.uid : null;
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('You have successfully signed in'))
      .catch(error => console.log(error.message));
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider;
    return this.socialLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialLogin(provider);
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.updateUser(user))
      .then(() => console.log('You have signed up'))
      .then(() => this.afAuth.auth.currentUser.sendEmailVerification());
  }

  singOut() {
    return this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/']);
      });
  }

  private updateUser(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email || null,    // just in case we do not receive the email
      displayName: user.displayName,
      photoURL: user.photoURL ||
      'http://www.gravatar.com/avatar/' + Md5.hashStr(user.uid) + '?d=mm'
    };
    return userRef.set(data, {merge: true});
  }

  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email)
      .then(() => console.log('Reset email has been sent'));
  }

  private socialLogin(provider) {
    return this.afAuth.auth.signInWithRedirect(provider)
      .then(credential => {
        return this.updateUser(credential.user);
      });
  }
}

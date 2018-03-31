import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {User} from './user.model';
import {AuthService} from '../core/auth.service';

@Injectable()
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(private afs: AngularFirestore, private auth: AuthService) { }

  getUsers() {
    this.userCollection = this.afs.collection('users');
    console.log('this.userCollection', this.userCollection);
    return this.userCollection.valueChanges();
  }

}

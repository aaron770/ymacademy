import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  photoUrl?: string;
  displayName?: string;
  class?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        console.log(user.displayName);
        console.log(user.uid)
        console.log(this.afs.doc<User>(`users/${user.id}`).snapshotChanges(), 'value changed')
/*         console.log(this.afs.doc<User>(`users/${user.id}`).valueChanges())

 */        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        console.log("its null")
        return Observable.of(null)
        
      }
    })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
/*       photoUrl: user.photoUrl,
      class: user.class */
    }
    return userRef.set(data);
  }

}

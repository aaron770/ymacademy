import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { User,  Rewards} from './user';





@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('email signup', user);
        return user;
        // return this.updateUserData(user); // create initial user document
        // need to see if I am passing in the right user
      })
      .catch(error => this.handleError(error) );
  }


  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        // return here so function can hadle loging in the specific role
        return credential.user;
        // this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error) );
  }

  private logout() {
    this.afAuth.auth.signOut()
      .then((res) => this.router.navigate(['/login']));
  }

  // If error, console log and notify user
  private handleError(error) {
    console.error(error);
    // this.notify.update(error.message, 'error');
  }

  // TODO: need to remove this due to new architecture
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      roles: {
        student: true
      }
    };
    // merge true makes the document update in undestructive way
    return userRef.set(data, { merge: true});
  }

  addRoleStudent(user) {
    const rewardsRef: AngularFirestoreDocument<Rewards> = this.afs.doc(`rewards/${user.uid}`);
    const reportCardRef: AngularFirestoreDocument<any> = this.afs.doc(`reportCards/${user.uid}`);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    // TODO: need to set current class to School[currentClass]
    // const currentClass: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    console.log('addRoleStudent signup', user);
    // Setting up classes
    // const classes: any = {
    //   currentClass: 'grade-8-chumash-q1',
    //   currentLesson: 5
    // };
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      currentClass: user.currentClass,
      roles: {
        student: true
      }
    };

    // userRef.update(classes);
    userRef.set(data, { merge: true});

    // setting up Rewards
    const initialRewardData: Rewards = {
      points: 0,
      coins: 0
    };
   // TODO: need to add point in general :)
    rewardsRef.set(initialRewardData, { merge: true});
  }

  // need to change this to valid for the specific roles also need to move to authGuard
  canRead(user: User): boolean {
    const allowed = ['admin', 'teacher', 'student', 'lessonPlanner'];
    return this.checkAuthorization(user, allowed);
  }

  // maybe if they want to take a practice test will need to see how logic works out for guardian
  canReadOwnReCard (user: User): boolean {
    const allowed = ['admin', 'teacher', 'student', 'lessonPlanner', 'principal'];
    return this.checkAuthorization(user, allowed);
  }

  canReadStudentReCard (user: User): boolean {
    const allowed = ['admin', 'teacher', 'student', 'lessonPlanner', 'guardian', 'principal'];
    return this.checkAuthorization(user, allowed);
  }

  canTakeTest (user: User): boolean {
    const allowed = ['admin', 'teacher', 'student', 'lessonPlanner', 'principal'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'teacher', 'principal'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);

  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {return false; }
    for (const role of allowedRoles) {
      if (user.roles[role] ) {
        return true;
      }
    }
    return false;

  }

}

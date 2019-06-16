import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireStorageModule, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import {AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../core/auth.service';
import {UploadFile} from '../models/upload-file';
import { User } from '../../core/user';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class UploadFileService {
  private basePath = '/uploads';
  private uploadTask: AngularFireUploadTask; // firebase.storage;
    // Progress monitoring
    percentage: Observable<number>;

    snapshot: Observable<any>;

    // Download URL
    downloadURL: Observable<string>;
  private user: User;
  constructor(private storage: AngularFireStorage,
     /* private db: AngularFireDatabase, */
      private authService: AuthService,
      private db: AngularFirestore
       /* private afs: AngularFirestore */) { }
  // this.authService.user.subscribe((user: User) => {
  // TODO: this is needed in the component to pass down the id on to the user fo rthe database file
  // ngOnInit(): void {
  //   this.authService.user.subscribe((user: User) => {
  //     this.user = user;
  //     // this.currentLesson = this.user.currentLesson;
  //     // this.currentClass = this.user.currentClass;
  //   });

  // }
  pushload(upload: any /* UploadFile */, fileRef: AngularFirestoreDocument<any>) {
    // const storageRef = firebase.storage().ref(`${this.basePath}/${upload.file.name}`);
    // this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    // this.uploadTask = storageRef.put(upload.file);
    // this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //   (snapshot) => {
    //     upload.progress = (snapshot.bytesTransfered / snapshot.TotalBytes) * 100;
    //   },
    //   (error) => {
    //     console.log(error);
    //   },
    //   () => {
    //     upload.url = this.uploadTask.snapshot.downloadURL;
    //     upload.name = upload.file.name;
    //     this.savedFileData(upload, fileRef);
    //   });
    const path = `${this.basePath}/${upload.file.name}`;
    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };
    this.uploadTask = this.storage.upload(path, upload.file, { customMetadata });

    this.percentage = this.uploadTask.percentageChanges();
    this.snapshot   = this.uploadTask.snapshotChanges();

    // The file's download URL
    this.downloadURL = this.uploadTask.downloadURL();
    console.log('this.downloadURL', this.downloadURL);

  }
  // TODO: this will be changed to add the file to database as a ref
  savedFileData(upload: any/* UploadFile */, fileRef: AngularFirestoreDocument<any>): any {
      // this.currentLesson = this.user.currentLesson;
      // this.currentClass = this.user.currentClass;
      // TODO: need to put on user files that need to be marked
      // const keriahDocsRef: AngularFirestoreDocument<any> = this.afs.doc(`reportCards/${user.currentClass}/${user.uid}/keriah`);
      fileRef.set(upload, { merge: true});


    throw new Error('Method not implemented.');
  }

  deleteUpload(upload: UploadFile) {
    this.deleteFilData(upload.$key)
    .then(() => {
      this.deleteFileStorage(upload.name);
    })
    .catch(error => console.log(error));
  }
  // unique name so name is the key to delete
  deleteFileStorage(name: string): any {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`);
  }
  // TODO: this will be changed because we are using a different database
  deleteFilData(key: string): any {
    return null;
    // return this.db.list(`${this.basePath}/`).remove(key);
  }

}

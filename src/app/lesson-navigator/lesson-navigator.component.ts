import { Component, OnInit } from '@angular/core';
//import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore'

@Component({
  selector: 'app-lesson-navigator',
  templateUrl: './lesson-navigator.component.html',
  styleUrls: ['./lesson-navigator.component.scss']
})
export class LessonNavigatorComponent implements OnInit {

  coursesObservable: Observable<any[]>;

  constructor(private db: AngularFirestore) { 
    this.coursesObservable = db.collection('/courses').valueChanges();
  }

  ngOnInit() {
    /* this.coursesObservable = this.getCourses('/courses');
    console.log(this.coursesObservable); */
    this.coursesObservable.subscribe(res => console.log(res));
    //console.log(this.coursesObservable);
  }

  /* getCourses(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  } */

}

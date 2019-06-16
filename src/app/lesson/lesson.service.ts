import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
  // {providedIn: 'root'}
@Injectable()
export class LessonService {

  constructor(private http: HttpClient) { }

  getCurrentLesson(url: String): Observable<Object> {
    return this.http.get(`shared/data/${url}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getQuestion(email: any, id: any): Observable<any> {
    if (email && id) {
      return this.http.get(this.baseUrl + 'question?email=' + email + '&id=' + id);
    } else {
      return this.http.get(this.baseUrl + 'question?email=' + email);
    }
  }

  postAnswers(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'answers', data);
  }
}

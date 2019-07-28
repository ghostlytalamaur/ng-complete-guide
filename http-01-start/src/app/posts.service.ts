import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';

const endpoint = 'https://ng-complete-guide-fbd.firebaseio.com/posts.json';

@Injectable({providedIn: 'root'})
export class PostsService {

  private readonly error: Subject<string> = new Subject<string>();
  error$ = this.error.asObservable();


  constructor(
    private readonly http: HttpClient
  ) {
  }

  createAndStorePost(title: string, content: string) {
    return this.http
      .post<{ name: string }>(
        endpoint,
        {title, content},
        {
          observe: 'response'
        }
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        err => {
          this.error.next(err.error.error);
        });
  }

  fetchPosts(): Observable<Post[]> {
    return this.http
      .get<{ [id: string]: { title: string; content: string } }>(endpoint,
        {
          params: new HttpParams().set('print', 'pretty')
        }
      )
      .pipe(
        map((responseData): Post[] => responseData ? Object.keys(responseData).map(id => ({id, ...responseData[id]})) : []),
        catchError((errResponse: HttpErrorResponse) => {
          return throwError(errResponse);
        })
      );
  }

  clearPosts() {
    return this.http.delete(endpoint);
  }
}

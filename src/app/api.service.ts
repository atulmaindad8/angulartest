import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:3000/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  constructor(private http: HttpClient) { }

  // addUser(user) {
    
  //   this.http.post(`${apiUrl}/add`, user)
  //       .subscribe(res => console.log('Done'));
  // }

  addUser(user,formData): Observable<any> {
    if(formData){
      user.formData = formData;
      user.profileUrl = 'userPic.png'
    }
    return this.http.post(`${apiUrl}/add`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUsers() {
    return this
           .http
           .get(`${apiUrl}`);
    }

    deleteUser(id: string): Observable<{}> {
      const url = `${apiUrl}/${id}`;
      return this.http.delete(url)
        .pipe(
          catchError(this.handleError)
        );
    }

}


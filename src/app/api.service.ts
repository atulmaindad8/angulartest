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
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  constructor(private http: HttpClient) { }

  addUser(fromdata): Observable<any> {

    return this.http.post(`${apiUrl}/add`, fromdata)
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

      getUser(email: string) {
        const url = `${apiUrl}/edit/${email}`;
        return this.http.get(url)
        .pipe(
          catchError(this.handleError)
          );
      }

      updateUser(id,formData): Observable<any> {
       
        return this.http.put(`${apiUrl}/update/${id}`, formData)
          .pipe(
            catchError(this.handleError)
          );
      }

      addCity(city): Observable<any> {

        return this.http.post(`${apiUrl}/addCity`, city)
          .pipe(
            catchError(this.handleError)
          );
      }

      getCities() {
        return this
               .http
               .get(`${apiUrl}/getCities`);
        }
      
        addSkill(skill): Observable<any> {

          return this.http.post(`${apiUrl}/addSkill`, skill)
            .pipe(
              catchError(this.handleError)
            );
        }
  
        getSkills() {
          return this
                 .http
                 .get(`${apiUrl}/getSkills`);
          }

}


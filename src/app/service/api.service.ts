import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  baseUri:string = 'http://localhost:4000/api';
  // baseUri:string = '/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  createUser(data:any): Observable<any> {
    console.log("inside the create");
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all employees
  getUser() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get employee
  getUsername(name : any): Observable<any> {
    console.log("inside the read");
    let url = `${this.baseUri}/read`;
    return this.http.post(url,name).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }


  // Update employee
  updateEmployee(data:any): Observable<any> {
    let url = `${this.baseUri}/update`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee

  deleteEmployee(data:any): Observable<any> {
    let url = `${this.baseUri}/delete`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  getallproducts(name : any): Observable<any> {
    console.log("inside the read");
    let url = `${this.baseUri}/readproduct`;
    return this.http.post(url,name).pipe(
      map((res: any) => {
        console.log("inside api");
        console.log(res);
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  

}
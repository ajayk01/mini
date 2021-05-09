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
    let url = `${this.baseUri}/read`;
    return this.http.post(url,name).pipe(
      map((res: any) => {
        return res || 0
      }),
      catchError(this.errorMgmt)
    )
  }


  // Update employee
  updateuser(data:any): Observable<any> {
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
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  post_cart(name : any): Observable<any> {
    console.log("inside the read");
    let url = `${this.baseUri}/postcart`;
    return this.http.post(url,name).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getallcart(name : any): Observable<any> {
    console.log("inside the get all cart");
    let url = `${this.baseUri}/getcart`;
    return this.http.post(url,name).pipe(
      map((res: any) => {
        console.log("inside");
        console.log(res);
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  

  removecart(data:any): Observable<any> {
    let url = `${this.baseUri}/removecart`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }


  place_order(name : any): Observable<any> {
    console.log("inside the place order");
    let url = `${this.baseUri}/placeorder`;
    return this.http.post(url,name).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  forgot_pass(name : any): Observable<any> {
    let url = `${this.baseUri}/forgot`;
    return this.http.post(url,name).pipe(
      map((res: any) => {
        return res || 0
      }),
      catchError(this.errorMgmt)
    )
  }
  admin_upload(data:any): Observable<any> { 
    let url = `${this.baseUri}/addproduct`;
    return this.http.post(url, data)
      .pipe(
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
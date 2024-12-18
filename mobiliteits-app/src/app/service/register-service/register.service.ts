// Import necessary Angular modules and dependencies
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { Router } from '@angular/router';

import { Observable, of, map } from "rxjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { RegisterApiResponse } from "../../data/interfaces/register"; // Import the CarDetailApiResponse type


 /**
 * @author Joey van der Kuijl
 *
 * registerService
 */
@Injectable({ providedIn: "root" })
export class RegisterService {
  
  private apiUrl = 'http://localhost:3002/'; // URL of your backend API

  private httpOptions = {
    withCredentials: true,
  };

  constructor(private http: HttpClient, private router: Router) { }

  public createNewAccount(formData): Observable<RegisterApiResponse> {
    return this.http.post<RegisterApiResponse>(`${this.apiUrl}/register`, formData, this.httpOptions)
      .pipe(
        tap(response => {
          console.log("Account created successfully:", response);
          this.router.navigate(['/login'], { queryParams: { call:  true} }); 
        }),
        catchError(error => {
          console.error("Error occurred while making POST request:", error);
          return throwError("Something went wrong with the POST request. Please try again later.");
        })
      );
  }
}

// /* The Observable class is part of the RxJS library,
// providing a way to handle asynchronous data streams.
// In this case, it's used to represent a stream of heroes
// (Hero[] for a list of heroes and Hero for a single hero).
// The of operator is used to create an observable from the provided data.*/

// /*@Injectable({ providedIn: 'root' }).
// This decorator allows Angular to inject this service as a singleton instance into any component or service that requests it.
// The { providedIn: 'root' } option means that this service is provided at the root level, making it available throughout the entire application. */

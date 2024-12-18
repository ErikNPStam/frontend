// Import necessary Angular modules and dependencies
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

import { Observable, of, map } from "rxjs";

import { Image } from "../data/interfaces/img";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { CarDetailApiResponse } from "../data/interfaces/cardetail"; // Import the CarDetailApiResponse type
import { CarCalculatedNumberApiResponse } from "../data/interfaces/carCalculatedNumber"; // Import the CarDetailApiResponse type

/**
* @author Joey van der Kuijl
*
* DetailCarService
*/
@Injectable({ providedIn: "root" })
export class DetailCarService {
  
  private apiUrl = 'http://localhost:3002/user/'; // URL of your backend API

  private httpOptions = {
    withCredentials: true,
  };

  constructor(private http: HttpClient) { }

  public getImages(): Observable<Image[]> {
    let images: Image[] = [
      { image_url: "https://swiperjs.com/demos/images/nature-1.jpg" },
      { image_url: "https://swiperjs.com/demos/images/nature-2.jpg" },
      { image_url: "https://swiperjs.com/demos/images/nature-3.jpg" },
      { image_url: "https://swiperjs.com/demos/images/nature-4.jpg" },
      { image_url: "https://swiperjs.com/demos/images/nature-5.jpg" },
      { image_url: "https://swiperjs.com/demos/images/nature-6.jpg" },
    ];
    console.log(of(images));
    return of(images);
  }

  public getCarInfo(id: string): Observable<CarDetailApiResponse> {
    return this.http
      .get<CarDetailApiResponse>(
        `${this.apiUrl}cardetail/${id}`,
        this.httpOptions,
      )
      .pipe(
        catchError(this.handleError<CarDetailApiResponse>("getCarInfo", null)),
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); 
      return throwError(`An error occurred: ${error.message}`);
    };
  }

  public getCalculatedCarInfo(formData): Observable<CarCalculatedNumberApiResponse> {
    return this.http.post<CarCalculatedNumberApiResponse>(`${this.apiUrl}cardetail/emission`, formData, this.httpOptions)
      .pipe(
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

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
// import { mockCars } from "../../data/mock/mock-cars";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, tap, throwError } from "rxjs";
import { Cars } from "../../data/interfaces/cars";
import { Rentals } from "../../data/interfaces/rentals";

@Injectable({
  providedIn: "root",
})

/**
 * Service class for fetching car data from a backend server using HTTP requests.
 * Handles errors and constructs HTTP requests with necessary headers and query parameters.
 * @class
 * @author Mohammad Yusufi
 *
 * @property {Cars[]} cars
 * @property {Object} httpOptions
 * @property {string} carUrl
 *
 * @param {HttpClient}
 */
export class ServiceDisplayCars {
  

  private _httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
    withCredentials: true,
  };
  public get httpOptions() {
    return this._httpOptions;
  }
  public set httpOptions(value) {
    this._httpOptions = value;
  }

  private handleError(error: any) {
    let errorMessage = "Netwerkfout of probleem met uw verbinding.";
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage
    } else if (error.status === 404) {
      errorMessage =
        error.error.error || "Helaas, hebben wij op dit moment geen auto's";
    } else if (error.status === 500) {
      errorMessage;
    }
    return throwError(errorMessage);
  }

  private carUrl = "http://localhost:3002/user/cars";

  constructor(private http: HttpClient) {}

  getTotalCars(): Observable<Cars[]> {
    return this.http
      .get<Cars[]>(`${this.carUrl}/all`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getRentals(): Observable<Rentals[]> {
    return this.http
      .get<Rentals[]>(`${this.carUrl}/rentals`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }



  searchCars(
    brand?: string,
    model?: string,
    fuelType?: string,
  ): Observable<Cars[]> {
    let queryParams = new HttpParams();
    if (brand) queryParams = queryParams.append("brand", brand);
    if (model) queryParams = queryParams.append("model", model);
    if (fuelType) queryParams = queryParams.append("fuelType", fuelType);

    return this.http.get<Cars[]>(`${this.carUrl}/search`, {
      params: queryParams,
      withCredentials: true,
    });
  }
}

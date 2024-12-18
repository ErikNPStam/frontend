import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Cars } from "../../data/interfaces/cars";

@Injectable({
  providedIn: "root",
})
export class UploadCarService {

  private _httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      //geeft aan dat formulier, betanden kan bevatten.
      enctype: "multipart/form-data",
    }),
    withCredentials: true,
  };
  public get httpOptions() {
    return this._httpOptions;
  }
  public set httpOptions(value) {
    this._httpOptions = value;
  }

  private uploadCarUrl = "http://localhost:3002/admin/cars";

  constructor(private http: HttpClient) {}

  uploadCar(formData: FormData): Observable<Cars[] | any> {
    return this.http.post<Cars[] | any>(`${this.uploadCarUrl}/upload`, formData, {
      withCredentials: true,
    }).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  checkAuthorization(): Observable<any> {
    return this.http.get(`${this.uploadCarUrl}/check-auth`, {
      withCredentials: true,
    }).pipe(
      catchError(error => {
        if (error.status === 401) {
          return throwError(() => new Error("Unauthorized"));
        }
        return throwError(() => error);
      })
    );
  }
}

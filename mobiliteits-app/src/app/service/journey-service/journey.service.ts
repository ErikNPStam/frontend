import { Injectable } from "@angular/core";
import { Journey } from "../../data/interfaces/journey";
// observable is a design pattern that allows us to listen to changes in the data.(async await)
import { Observable, catchError, map, of, tap } from "rxjs";
import { MessageService } from "../message-service/message.service";
import { JOURNEYS } from "../../data/mock/mock-journeys";
import { HttpClient, HttpHeaders } from "@angular/common/http";

/**
 * Injectable decorator to allow the service to be injected into other components.
 * providedIn: 'root' specifies that the service should be provided in the root injector.
 * ?https://angular.io/guide/providers
 * ?https://angular.io/guide/dependency-injection
 */
@Injectable({
  providedIn: "root",
})
/**
 * Service for managing journeys.
 */
export class JourneyService {
  private baseUrl = "http://localhost:3002/user";

  private httpOptions = {
    withCredentials: true,
  };

  //inject the message service when the journeyService is created(service in service)
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  /**
   * Retrieves the list of journeys from the server.
   * This method makes an HTTP GET request to the backend server to fetch the list of journeys.
   * It returns an observable which can be subscribed to in order to get the list of journeys.
   * If there is an error during the HTTP request, it will be handled by the handleError method, 
   * and an empty array will be returned as a fallback.
   * @returns {Observable<Journey[]>} An observable of Journey objects.
   * ?https://angular.io/guide/observables
   * ?https://rxjs-dev.firebaseapp.com/guide/observable
   * ?https://www.typescriptlang.org/docs/handbook/2/generics.html
   */
  public getAllJourneys(): Observable<Journey[]> {
    const url = "http://localhost:3002/admin/journeys";
    return this.http.get<Journey[]>(url, this.httpOptions).pipe(
      catchError((error) => {
        throw (error.error.message || 'An error occured while fetching data.');
      })
    );
  }


  /**
   * Returns an array of journeys that belong to the user.
   * @returns {Journey[]}
   */

  public getJourneys(): Observable<Journey[]> {
    return this.http
      .get<Journey[]>(`${this.baseUrl}/journeys`, this.httpOptions)
      .pipe(tap((_) => this.log("fetched journeys")));
  }

  public createJourney(body: any): Observable<{}> {
    return this.http
      .post<Journey>(`${this.baseUrl}/journey`, body, this.httpOptions)
      .pipe(tap((_) => this.log("created a journey")));
  }

  public deleteJourney(jounreyCreatedAt) {
    return this.http
      .delete<void>(`${this.baseUrl}/journey/delete/${jounreyCreatedAt}`, this.httpOptions)
      .pipe(tap((_) => this.log("journey deleted")))
  }

  private log(message: string): void {
    this.messageService.add(`JourneyService: ${message}`);
  }

  /**
   * Handles errors that occur during an operation.
   * 
   * @template T - The type of the result.
   * @param operation - The name of the operation.
   * @param result - The default result to return in case of an error.
   * @returns An Observable of type T.
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      const errorMessage = error.error.message || 'Er is een onbekende fout opgetreden.';
      // Log de foutmelding
      this.log(`${operation} mislukt: ${errorMessage}`);

      // Retourneer het foutbericht
      return of(errorMessage as T);
    };
  }
}


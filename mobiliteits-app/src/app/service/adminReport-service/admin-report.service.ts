import { Injectable } from "@angular/core";
import { AdminReport } from "../../data/interfaces/adminReport";
// observable is a design pattern that allows us to listen to changes in the data.(async await)
import { Observable, catchError, map, of, tap } from "rxjs";
import { MessageService } from "../message-service/message.service";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AdminReportService {
  private adminReport = "http://localhost:3002/admin/rapport";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
    withCredentials: true,
  };

  //inject the message service when the service is created(service in service)
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  /**
   * Retrieves the admin report.
   * @returns - An observable of AdminReport objects.
   */
  public getAdminReport(month: number, yearNumber: number): Observable<AdminReport[]> {
    const getAdminReportUrl = `${this.adminReport}/${month}/${yearNumber}`;
    return this.http.get<AdminReport[]>(getAdminReportUrl, this.httpOptions).pipe(
      tap((_) => this.log("fetched admin report")),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Unknown error occurred';
        switch (error.status) {
          case 401:
            errorMessage = 'Unauthorized access!';
            break;
          case 403:
            errorMessage = 'Forbidden access!';
            break;
          case 404:
            errorMessage = 'Resource not found!';
            break;
          case 422:
            errorMessage = 'Service failed!';
          case 500:
            errorMessage = 'Internal server error!';
            break;
        }
        return of({ error: errorMessage } as unknown as AdminReport[]);
      }),
    );
  }

  /**
   * Logs the admin report to the console.
   * @param message 
   */
  private log(message: string): void {
    this.messageService.add(`adminReport: ${message}`);
  }
}
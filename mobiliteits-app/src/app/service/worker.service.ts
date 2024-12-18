import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Worker } from "../data/interfaces/worker";
import { WORKERS } from "../data/mock/mock-worker";

@Injectable({
  providedIn: "root",
})
export class WorkerService {
  private apiUrl = "http://localhost:3002";

  constructor() {}

  getWorkers(): Observable<Worker[]> {
    return of(WORKERS);
  }
}

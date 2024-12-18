import { Component, OnInit } from '@angular/core';
import { Journey } from '../data/interfaces/journey';
import { JourneyService } from '../service/journey-service/journey.service';

interface Error {
  status: number;
  message: string;
}

@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.css'],
})
export class JourneysComponent implements OnInit {
  private _journeys: Journey[] = [];
  private _error: Error | null = null;
  private _fetched: boolean = false;
  private _pageLength: number = 8;
  private _pageNumber: number = 1;

  public get journeys(): Journey[] {
    return this._journeys;
  }
  private set journeys(value: Journey[]) {
    this._journeys = value;
  }

  public get error(): Error | null {
    return this._error;
  }

  private set error(value: Error | null) {
    this._error = value;
  }

  public get fetched(): boolean {
    return this._fetched;
  }

  private set fetched(value: boolean) {
    this._fetched = value;
  }

  public get pageLength(): number {
    return this._pageLength;
  }

  private set pageLength(value: number) {
    this._pageLength = value;
  }

  public get pageNumber(): number {
    return this._pageNumber;
  }

  private set pageNumber(value: number) {
    this._pageNumber = value;
  }

  constructor(private journeyService: JourneyService) { }

  /**
   * Gets the journeys of the user on initilization.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.getJourneys();
  }

  /**
   * Gets the journeys of the user.
   * @returns {void}
   */
  private getJourneys(): void {
    this.journeyService.getJourneys().subscribe(
      (journeys) => {
        this.journeys = journeys;
      },
      (error) => {
        const status = error.status;
        const message = error.error.message;

        this.error = {
          status: status,
          message: message || "Failed to connect to server.",
        };
      },
      () => {
        this.fetched = true;
      },
    );
  }


  public deleteJourney(journey: Journey): void {
    const createdAt = journey.createdAt;

    this.journeyService.deleteJourney(createdAt).subscribe(
      () => {
        this.getJourneys();
      },
      (error) => {
        const status = error.status;
        const message = error.error.message;

        this.error = {
          status: status,
          message: message || "Failed to connect"
        }
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Journey } from '../data/interfaces/journey';
import { JourneyService } from '../service/journey-service/journey.service';

/**
 * component decorator to define the component's metadata.
 * ?https://angular.io/api/core/Component
 */
@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css'],
})
export class JourneyComponent implements OnInit {
  private _journeys: Journey[] = [];
  private _error: { error } | null = null;
  private _fetched: boolean = false;

  private _pageLength: number = 8;
  private _pageNumber: number = 1;

  constructor(private journeyService: JourneyService) { }

  /**
   * Gets the journeys of the user on initialization.
   * @returns {void}
   */
  ngOnInit(): void {
    this.getAllJourneys();
  }

  /**
   * Gets the journeys of the user.
   * @returns {void}
   */
  private getAllJourneys(): void {
    this.journeyService.getAllJourneys().subscribe(
      (journeys) => {
        console.log(journeys);
        this._journeys = journeys;
        if (journeys.length === 0) {
          console.warn("No journeys found"); // Log a warning if no journeys are found
        }
      },
      (error) => {
        console.log(error);
        const status = error.status;
        const message = error.error?.message || "Failed to connect to server.";
        this._error = { error };

      },
      () => {
        this._fetched = true;
      }
    );
  }

  get journeys(): Journey[] {
    return this._journeys;
  }

  get error(): { error } | null {
    return this._error;
  }

  get fetched(): boolean {
    return this._fetched;
  }

  get pageLength(): number {
    return this._pageLength;
  }

  get pageNumber(): number {
    return this._pageNumber;
  }
}

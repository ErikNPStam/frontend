import { Component, OnInit } from '@angular/core';
import { Journey } from '../data/interfaces/journey';
import { JourneyService } from '../service/journey-service/journey.service';

@Component({
  selector: 'app-admin-panel',
  standalone: false,
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent implements OnInit {
  journeys: Journey[] = [];

  constructor(private journeyService: JourneyService) {}

  ngOnInit(): void {
    this.getJourneys();
  }

  getJourneys(): void {
    this.journeyService
      .getAllJourneys()
      .subscribe((journeys) => (this.journeys = journeys));
  }
}

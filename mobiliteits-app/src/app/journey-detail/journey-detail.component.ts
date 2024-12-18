import { Component, Input } from '@angular/core';
import { Journey } from '../data/interfaces/journey';

@Component({
  selector: 'app-journey-detail',
  templateUrl: './journey-detail.component.html',
  styleUrl: './journey-detail.component.css',
})
export class JourneyDetailComponent {
  @Input() journey?: Journey;
}

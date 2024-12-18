import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JourneyComponent } from './journey.component';
import { JourneyService } from '../service/journey-service/journey.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Journey } from '../data/interfaces/journey';

describe('JourneyComponent', () => {
  let component: JourneyComponent;
  let fixture: ComponentFixture<JourneyComponent>;
  let journeyService: jasmine.SpyObj<JourneyService>;

  beforeEach(async () => {
    const journeyServiceSpy = jasmine.createSpyObj('JourneyService', ['getAllJourneys']);

    await TestBed.configureTestingModule({
      declarations: [JourneyComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: JourneyService, useValue: journeyServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JourneyComponent);
    component = fixture.componentInstance;
    journeyService = TestBed.inject(JourneyService) as jasmine.SpyObj<JourneyService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch journeys on initialization', () => {
    const mockJourneys: Journey[] = [
      {
        type: 'Business', date: '2023-06-01', vehicle: 'Car', addressFrom: 'Address A', addressTo: 'Address B',
        distance: 120, price: 50, fuelType: 'Petrol', emissions: 100, workerId: 1, licensePlate: 'ABC-123'
      },
      {
        type: 'Personal', date: '2023-06-02', vehicle: 'Bike', addressFrom: 'Address C', addressTo: 'Address D',
        distance: 30, price: 0, fuelType: 'None', emissions: 0, workerId: 2, licensePlate: 'XYZ-789'
      }
    ];
    journeyService.getAllJourneys.and.returnValue(of(mockJourneys));

    fixture.detectChanges();

    expect(component.journeys).toEqual(mockJourneys);
    expect(component.error).toBeNull();
    expect(component.fetched).toBeTrue();
  });

  it('should handle errors when fetching journeys', () => {
    const errorResponse = { error: 'Failed to connect to server.' };
    journeyService.getAllJourneys.and.returnValue(throwError(() => errorResponse.error));

    fixture.detectChanges();

    expect(component.journeys.length).toBe(0);
    expect(component.error).toEqual(errorResponse);
    expect(component.fetched).toBeFalse();
  });

  // Edge Cases

  it('should handle no journeys available', () => {
    journeyService.getAllJourneys.and.returnValue(of([]));

    fixture.detectChanges();

    expect(component.journeys.length).toBe(0);
    expect(component.error).toBeNull();
    expect(component.fetched).toBeTrue();
  });

  it('should handle server errors without message', () => {
    const errorResponse = { error: 'Failed to connect to server.' };;
    journeyService.getAllJourneys.and.returnValue(throwError(() => errorResponse.error));

    fixture.detectChanges();

    expect(component.journeys.length).toBe(0);
    expect(component.error).toEqual(errorResponse);
    expect(component.fetched).toBeFalse();
  });
});

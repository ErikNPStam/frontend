import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

import { JourneysComponent } from './journeys.component';
import { JourneyService } from '../service/journey-service/journey.service';
import { Journey } from '../data/interfaces/journey';
import { NgxPaginationModule } from 'ngx-pagination';

describe('JourneysComponent', () => {
    let component: JourneysComponent;
    let fixture: ComponentFixture<JourneysComponent>;
    let journeyService: jasmine.SpyObj<JourneyService>;

    const mockJourneys: Journey[] = [
        {
            type: 'Commuting',
            date: '2024-05-20',
            vehicle: 'Car',
            addressFrom: '',
            addressTo: '',
            distance: 20,
            price: 1,
            fuelType: 'Diesel',
            emissions: 10,
            workerId: 0,
            licensePlate: ''
        }
    ];

    beforeEach(waitForAsync(() => {
        const journeyServiceSpy = jasmine.createSpyObj('JourneyService', ['getJourneys']);

        TestBed.configureTestingModule({
            declarations: [JourneysComponent],
            imports: [NgxPaginationModule],
            providers: [
                { provide: JourneyService, useValue: journeyServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(JourneysComponent);
        component = fixture.componentInstance;
        journeyService = TestBed.inject(JourneyService) as jasmine.SpyObj<JourneyService>;
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch journeys on initialization', () => {
        journeyService.getJourneys.and.returnValue(of(mockJourneys));

        component.ngOnInit();
        fixture.detectChanges();

        expect(component.journeys).toEqual(mockJourneys);
        expect(component.fetched).toBeTrue();
        expect(component.error).toBeNull();
    });

    it('should handle error if fetching journeys fails', () => {
        const mockError = { status: 500, error: { message: 'Internal Server Error' } };
        journeyService.getJourneys.and.returnValue(throwError(mockError));

        component.ngOnInit();
        fixture.detectChanges();

        expect(component.journeys.length).toBe(0);
        expect(component.fetched).toBeFalse();
        expect(component.error).toEqual({ status: 500, message: 'Internal Server Error' });
    });

    it('should handle error without a specific error message', () => {
        const mockError = { status: 404, error: {} };
        journeyService.getJourneys.and.returnValue(throwError(mockError));

        component.ngOnInit();
        fixture.detectChanges();

        expect(component.journeys.length).toBe(0);
        expect(component.fetched).toBeFalse();
        expect(component.error).toEqual({ status: 404, message: 'Failed to connect to server.' });
    });

});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JourneyService } from './journey.service';
import { MessageService } from '../message-service/message.service';
import { Journey } from '../../data/interfaces/journey';

describe('JourneyService', () => {
    let service: JourneyService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [JourneyService, MessageService]
        });

        service = TestBed.inject(JourneyService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Ensure that there are no outstanding requests
    });

    it('should fetch all journeys', () => {
        const dummyJourneys: Journey[] = [
            {
                type: "55",
                date: "55",
                vehicle: "55",
                addressFrom: "55",
                addressTo: "55",
                distance: 5,
                price: 2,
                fuelType: "55",
                emissions: 7,
                workerId: 6,
                licensePlate: "55"
            },
            {
                type: "55",
                date: '3',
                vehicle: "55",
                addressFrom: "55",
                addressTo: "55",
                distance: 5,
                price: 2,
                fuelType: "55",
                emissions: 7,
                workerId: 6,
                licensePlate: "55"
            }
        ];

        service.getAllJourneys().subscribe(journeys => {
            expect(journeys.length).toBe(2);
            expect(journeys).toEqual(dummyJourneys);
        });

        const req = httpMock.expectOne('http://localhost:3002/admin/journeys');
        expect(req.request.method).toBe('GET');
        req.flush(dummyJourneys);
    });

    it('should handle error when fetching all journeys fails', () => {
        const errorMessage = 'An error occured while fetching data.';

        service.getAllJourneys().subscribe(journeys => {
            expect(journeys.length).toBe(0);
        }, error => {
            expect(error).toEqual(errorMessage);
        });

        const req = httpMock.expectOne('http://localhost:3002/admin/journeys');
        req.error(new ProgressEvent('Network error'), { status: 404, statusText: 'Not Found' });
    });
});

import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JourneyFormComponent } from './journey-form.component';
import { JourneyService } from '../service/journey-service/journey.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('JourneyFormComponent', () => {
    let component: JourneyFormComponent;
    let fixture: ComponentFixture<JourneyFormComponent>;
    let journeyService: jasmine.SpyObj<JourneyService>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(waitForAsync(() => {
        const journeyServiceSpy = jasmine.createSpyObj('JourneyService', ['createJourney']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            declarations: [JourneyFormComponent],
            imports: [ReactiveFormsModule, HttpClientTestingModule],
            providers: [
                FormBuilder,
                { provide: JourneyService, useValue: journeyServiceSpy },
                { provide: Router, useValue: routerSpy }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(JourneyFormComponent);
        component = fixture.componentInstance;
        journeyService = TestBed.inject(JourneyService) as jasmine.SpyObj<JourneyService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with default values', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const form = component.form;

        expect(form).toBeDefined();
        expect(form.get('type').value).toEqual('');
        expect(form.get('date').value).toEqual('');
        expect(form.get('transport').value).toEqual('');
        expect(form.get('fuelType').value).toEqual('');
        expect(form.get('addressFrom').value).toEqual('');
        expect(form.get('addressTo').value).toEqual('');
        expect(form.get('distance').value).toEqual(0);
        expect(form.get('price').value).toEqual(0);
    });

    it('should set fuelType validator when transport is Car', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const transportControl = component.form.get('transport');
        const fuelTypeControl = component.form.get('fuelType');

        transportControl.setValue('Car');
        fixture.detectChanges();

        expect(fuelTypeControl.validator).toBeTruthy();
        expect(fuelTypeControl.errors).toEqual({ required: true });
    });

    it('should clear fuelType validator when transport is not Car', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const transportControl = component.form.get('transport');
        const fuelTypeControl = component.form.get('fuelType');

        transportControl.setValue('Car');
        fixture.detectChanges();

        transportControl.setValue('Bus');
        fixture.detectChanges();

        expect(fuelTypeControl.validator).toBeNull();
    });

    it('should not submit the form if it is invalid', () => {
        component.ngOnInit();
        fixture.detectChanges();

        component.onSubmit();

        expect(component.submitted).toBeTrue();
        expect(journeyService.createJourney).not.toHaveBeenCalled();
    });

    it('should submit the form if it is valid', () => {
        component.ngOnInit();
        fixture.detectChanges();

        component.form.setValue({
            type: 'Business',
            date: '2023-05-20',
            transport: 'Car',
            fuelType: 'Petrol',
            addressFrom: '123 Main St',
            addressTo: '456 Elm St',
            distance: 100,
            price: 50,
        });

        journeyService.createJourney.and.returnValue(of({}));

        component.onSubmit();

        expect(component.submitted).toBeTrue();
        expect(journeyService.createJourney).toHaveBeenCalledOnceWith({
            date: '2023-05-20',
            type: 'Business',
            addressFrom: '123 Main St',
            addressTo: '456 Elm St',
            distance: 100,
            price: 50,
            transport: 'Petrol Car'
        });
        expect(router.navigate).toHaveBeenCalledWith(['/journeys']);
    });

    // it('should handle form submission error', () => {
    //     component.ngOnInit();
    //     fixture.detectChanges();

    //     component.form.setValue({
    //         type: 'Business',
    //         date: '2023-05-20',
    //         transport: 'Car',
    //         fuelType: 'Petrol',
    //         addressFrom: '123 Main St',
    //         addressTo: '456 Elm St',
    //         distance: 100,
    //         price: 50,
    //     });

    //     journeyService.createJourney.and.returnValue(throwError({ status: 500, message: 'Internal Server Error' }));

    //     component.onSubmit();

    //     expect(component.submitted).toBeTrue();
    //     expect(journeyService.createJourney).toHaveBeenCalledOnceWith({
    //         date: '2023-05-20',
    //         type: 'Business',
    //         addressFrom: '123 Main St',
    //         addressTo: '456 Elm St',
    //         distance: 100,
    //         price: 50,
    //         transport: 'Petrol Car'
    //     });
    //     expect(router.navigate).not.toHaveBeenCalled();
    // });
});

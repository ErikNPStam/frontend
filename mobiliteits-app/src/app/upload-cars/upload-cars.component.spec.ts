import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UploadCarsComponent } from './upload-cars.component';
import { UploadCarService } from '../service/uploadCar-service/uploadCar.service';

describe('UploadCarsComponent', () => {
  
  let component: UploadCarsComponent;
  let fixture: ComponentFixture<UploadCarsComponent>;
  let uploadCarService: UploadCarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadCarsComponent], 
      imports: [HttpClientTestingModule, FormsModule],
      providers: [UploadCarService] 
    })
    .compileComponents();

    
    fixture = TestBed.createComponent(UploadCarsComponent);
 
    component = fixture.componentInstance;

    uploadCarService = TestBed.inject(UploadCarService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set authorized to true if checkAuthorization succeeds', () => {
    spyOn(uploadCarService, 'checkAuthorization').and.returnValue(of({}));
   
    component.ngOnInit();

    fixture.detectChanges();

    expect(component.authorized).toBe(true);

    expect(component.errorMessage).toBe('');
  });

  it('should set authorized to false if checkAuthorization fails with Unauthorized error', () => {
    spyOn(uploadCarService, 'checkAuthorization').and.returnValue(throwError(() => new Error('Unauthorized')));
   
    component.ngOnInit();
 
    fixture.detectChanges();

    expect(component.authorized).toBe(false);
   
    expect(component.errorMessage).toBe('You are not authorized to view this page.');
  });

  it('should handle other errors from checkAuthorization', () => {
    spyOn(uploadCarService, 'checkAuthorization').and.returnValue(throwError(() => new Error('Other error')));

    component.ngOnInit();
  
    fixture.detectChanges();
    
    expect(component.authorized).toBe(true);
  
    expect(component.errorMessage).toBe('');
  });

  it('should show success message after successful form submission', () => {
    spyOn(uploadCarService, 'uploadCar').and.returnValue(of({}));

    const form = {
      valid: true,
      value: {
        licensePlate: 'ABC123',
        brand: 'Toyota',
        model: 'Corolla',
        transmission: 'Automatic',
        buildYear: 2020,
        fuelType: 'Petrol',
        mileage: 15000
      },
      reset: jasmine.createSpy('reset')
    } as any;

    const fileInput = {
      files: [new Blob(['car image'], { type: 'image/jpeg' })],
      value: ''
    } as any;

    component.onSubmit(form, fileInput);

    fixture.detectChanges();

    expect(uploadCarService.uploadCar).toHaveBeenCalled();

    expect(component.successMessage).toBe('Car added successfully!');

    expect(component.errorMessage).toBe('');

    expect(form.reset).toHaveBeenCalled();
    
    expect(fileInput.value).toBe('');
  });
});

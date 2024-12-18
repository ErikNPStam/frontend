import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from '@angular/router';
import { CarDetailpageComponent } from "./car-detailpage.component";
import { SwiperModule } from "swiper/angular";
import { CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { of, throwError } from 'rxjs';
import { DetailCarService } from "../service/detailCar.service";
import { CarDetailApiResponse } from "../data/interfaces/cardetail";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarCalculatedNumberApiResponse } from "../data/interfaces/carCalculatedNumber";
import { FormsModule } from "@angular/forms";

/**
* @author Joey van der Kuijl
*
* CardetailpageComponent test
*/
describe("CarDetailpageComponent", () => {
  let component: CarDetailpageComponent;
  let fixture: ComponentFixture<CarDetailpageComponent>;
  let detailServiceSpy: jasmine.SpyObj<DetailCarService>;
  let httpTestingController: HttpTestingController;


  beforeEach(async () => {

    detailServiceSpy = jasmine.createSpyObj('DetailCarService', ['getCarInfo', 'getImages', 'getCalculatedCarInfo']);

    await TestBed.configureTestingModule({
      declarations: [CarDetailpageComponent],
      imports: [SwiperModule, BrowserAnimationsModule, HttpClientTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: DetailCarService, useValue: detailServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', 'ABC123']])),
          },
        }
      ]
    }).compileComponents();
//method is a part of Angular's testing utilities. It's used in the setup of Angular component tests. 
//This method is called to compile the component's template and CSS

    detailServiceSpy.getCarInfo.and.returnValue(of<CarDetailApiResponse>({
      licensePlate: 'ABC123',
      model: 'Civic',
      brand: 'Honda',
      transmission: 'Automatic',
      mileage: 50000,
      buildYear: 2020,
      fuelType: 'Petrol',
      carImage: null
    }));

    detailServiceSpy.getImages.and.returnValue(of([
      { image_url: "https://swiperjs.com/demos/images/nature-1.jpg" },
      { image_url: "https://swiperjs.com/demos/images/nature-2.jpg" },
      { image_url: "https://swiperjs.com/demos/images/nature-3.jpg" },
      { image_url: "https://swiperjs.com/demos/images/nature-4.jpg" },
      { image_url: "https://swiperjs.com/demos/images/nature-5.jpg" },
      { image_url: "https://swiperjs.com/demos/images/nature-6.jpg" },
    ]));
    
    detailServiceSpy.getCalculatedCarInfo.and.returnValue(of<CarCalculatedNumberApiResponse>({
      emissions: "12345"
    }));

    fixture = TestBed.createComponent(CarDetailpageComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should call getCarInfo with the correct id', () => {
    component.getCarInfo('ABC123');
    expect(detailServiceSpy.getCarInfo).toHaveBeenCalledWith('ABC123');
  });

  it('should call getImages method from service', () => {
    component.getImages();
    expect(detailServiceSpy.getImages).toHaveBeenCalled();
  });

  it('should call postCarEmissions method from service', () => {
    component.postCarEmissions({
      km: 12345,
      id: 'ABC123',
      fueltype: 'Petrol',
    });
    expect(detailServiceSpy.getCalculatedCarInfo).toHaveBeenCalledWith({
      km: 12345,
      id: 'ABC123',
      fueltype: 'Petrol',
    });
  });

  it('should set carInfo when getCarInfo returns data', () => {
    const mockCarInfo: CarDetailApiResponse = {
      licensePlate: 'ABC123',
      model: 'Civic',
      brand: 'Honda',
      transmission: 'Automatic',
      mileage: 50000,
      buildYear: 2020,
      fuelType: 'Petrol',
      carImage: null
    };

    detailServiceSpy.getCarInfo.and.returnValue(of(mockCarInfo));

    component.loadData('ABC123');
    fixture.detectChanges();

    expect(component.modelCar).toEqual(mockCarInfo);
  });

  it('should set error when getCarInfo returns an error', () => {
    const error = { status: 500, message: 'Failed to connect to server.' };
    detailServiceSpy.getCarInfo.and.returnValue(throwError(error));

    component.loadData('ABC123');
    fixture.detectChanges();

    expect(component.error).toEqual(error);
  });

    /**
  * @author Max Sijbrands
  *
  * Unit test for the getImages method
  */
    it('should load images into Swiper component', () => {
      const compiled = fixture.nativeElement;
      const images = compiled.querySelectorAll('.swiper-slide img');
      expect(images.length).toEqual(14); // Expecting 14 images based on the getImages method
    });
    // add more tests if needed
});

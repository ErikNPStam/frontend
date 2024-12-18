import {
  Component,
  ViewEncapsulation,
  ViewChild,
  AfterContentChecked,
  OnInit,
} from "@angular/core";
import { SwiperComponent } from "swiper/angular";
import { Image } from "../data/interfaces/img";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { DetailCarService } from "../service/detailCar.service";
import { ActivatedRoute } from '@angular/router';

import SwiperCore, {
  FreeMode,
  Navigation,
  SwiperOptions,
  Thumbs,
} from "swiper";
import { CarDetailApiResponse } from "../data/interfaces/cardetail";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: "app-car-detailpage",
  templateUrl: "./car-detailpage.component.html",
  styleUrls: ["./car-detailpage.component.css"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("expandCollapse", [
      state(
        "expanded",
        style({
          opacity: 1,
          transform: "scale(1, 1)",
        }),
      ),
      state(
        "collapsed",
        style({
          opacity: 0,
          transform: "scale(0.95, 0.95)",
        }),
      ),
      transition("expanded => collapsed", [animate("500ms ease-in")]),
      transition("collapsed => expanded", [animate("500ms ease-out")]),
    ]),
  ],
})
export class CarDetailpageComponent implements AfterContentChecked, OnInit {
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  thumbsSwiper: any;
  @ViewChild("swiper") swiper: SwiperComponent;

  private _modelCar: CarDetailApiResponse = {
    licensePlate: "",
    model: "",
    brand: "",
    transmission: "",
    mileage: 0,
    buildYear: 0,
    fuelType: "",
    carImage: null,
  };

  public get modelCar(): CarDetailApiResponse {
    return this._modelCar;
  }
  private set modelCar(value: CarDetailApiResponse) {
    this._modelCar = value;
  }

  error: { status: number; message: string } | null = null;

  private _isExpanded = false;
  public get isExpanded() {
    return this._isExpanded;
  }
  private set isExpanded(value) {
    this._isExpanded = value;
  }

  private _images: Image[] = [];
  public get images(): Image[] {
    return this._images;
  }
  private set images(value: Image[]) {
    this._images = value;
  }
  private _emissions;
  public get emissions(): any {
    return this._emissions;
  }
  public set emissions(value: any) {
    this._emissions = value;
  }

  indexSelectedCoverage = 1;

  config_swiper_1: SwiperOptions = {
    spaceBetween: 0,
    navigation: true,
    loop: true,
  };

  config_swiper_2: SwiperOptions = {
    spaceBetween: 0,
    navigation: false,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  };

  formData = {
    km: null,
    id: '',
    fuelType: this.modelCar.fuelType,
  };

  constructor(private route: ActivatedRoute, private detailService: DetailCarService) { }

  public toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  public onSubmit(): void {
    this.postCarEmissions(this.formData);
    console.log("Form Data:", this.formData);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadData(id);
      }
    });
  }

  public loadData(id: string): void {
    this.getImages();
    this.getCarInfo(id);
    this.formData.id = id;
    this.isExpanded = false;
  }

  public getImages(): void {
    this.detailService.getImages().subscribe({
      next: (images) => {
        console.log(images);
        this.images = images;
      },
      error: (err) => {
        console.error("Failed to load images", err);
      }
    });
  }

  public getCarInfo(id: string): void {
    this.detailService.getCarInfo(id).subscribe({
      next: (car) => {
        console.log(car);
        this.modelCar = car;
        console.log(this.modelCar, "modelCar");
        this.formData.fuelType = car.fuelType;
      },
      error: (error) => {
        const status = error.status;
        const message = error.error?.message || "Failed to connect to server.";
        this.error = { status, message };
      }
    });
  }

  public postCarEmissions(formData): void {
    console.log("Form Data:", formData);
    this.detailService.getCalculatedCarInfo(formData).subscribe({
      next: (info) => {
        console.log(info);
        this.emissions = info;
      },
      error: (err) => {
        console.error("Failed to calculate emissions", err);
      }
    });
  }

  public ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }
}

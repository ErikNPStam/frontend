import { Component, OnInit } from '@angular/core';
import { Cars } from '../data/interfaces/cars';
import { ServiceDisplayCars } from '../service/display-cars-service/displayCars.service';

@Component({
  selector: 'app-cars-page-component',
  templateUrl: './cars-page-component.component.html',
  styleUrls: ['./cars-page-component.component.css'],
})
export class CarsdisplayComponent implements OnInit {
  private _cars: Cars[] = [];
  public get cars(): Cars[] {
    return this._cars;
  }
  public set cars(value: Cars[]) {
    this._cars = value;
  }
  private _filteredCars: Cars[] = [];
  public get filteredCars(): Cars[] {
    return this._filteredCars;
  }
  public set filteredCars(value: Cars[]) {
    this._filteredCars = value;
  }
  private _availableCars: Cars[] = [];
  public get availableCars(): Cars[] {
    return this._availableCars;
  }
  public set availableCars(value: Cars[]) {
    this._availableCars = value;
  }
  private _currentPage: number = 1;
  public get currentPage(): number {
    return this._currentPage;
  }
  public set currentPage(value: number) {
    this._currentPage = value;
  }
  private _message: string = '';
  public get message(): string {
    return this._message;
  }
  public set message(value: string) {
    this._message = value;
  }

  showAvailableCarsOnly: boolean = false;  // Nieuwe boolean variabele
  defaultImageUrl: string = 'https://wallpapers.com/images/hd/black-and-white-coming-soon-bzi46iyao5sx2kc6.jpg'; // Definieer de standaard afbeeldings-URL hier

  constructor(private carService: ServiceDisplayCars) { }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getTotalCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.filteredCars = cars;
      },
      error: (err) => {
        this.message = err;
      }
    });
  }

  hasCars(): boolean {
    return this.cars && this.cars.length > 0;
  }

  onFilterApplied(filteredCars: Cars[]): void {
    this.filteredCars = filteredCars;
    this.currentPage = 1;
  }
}

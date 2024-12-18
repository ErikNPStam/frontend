import { ServiceDisplayCars } from "../service/display-cars-service/displayCars.service";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Cars } from "../data/interfaces/cars";

@Component({
  selector: "app-car-display-filter",
  templateUrl: "./car-display-filter.component.html",
  styleUrls: ["./car-display-filter.component.css"],
})
export class CarDisplayFilterComponent implements OnInit {
  private _cars: Cars[];
  public get cars(): Cars[] {
    return this._cars;
  }
  public set cars(value: Cars[]) {
    this._cars = value;
  }
  private _allCars: Cars[] = [];
  public get allCars(): Cars[] {
    return this._allCars;
  }
  public set allCars(value: Cars[]) {
    this._allCars = value;
  }
  private _brands: string[];
  public get brands(): string[] {
    return this._brands;
  }
  public set brands(value: string[]) {
    this._brands = value;
  }
  private _models: string[];
  public get models(): string[] {
    return this._models;
  }
  public set models(value: string[]) {
    this._models = value;
  }
  private _fuelTypes: string[];
  public get fuelTypes(): string[] {
    return this._fuelTypes;
  }
  public set fuelTypes(value: string[]) {
    this._fuelTypes = value;
  }
  private _selectedBrand: string = "";
  public get selectedBrand(): string {
    return this._selectedBrand;
  }
  public set selectedBrand(value: string) {
    this._selectedBrand = value;
  }
  private _selectedModel: string = "";
  public get selectedModel(): string {
    return this._selectedModel;
  }
  public set selectedModel(value: string) {
    this._selectedModel = value;
  }
  private _selectedFuelType: string = "";
  public get selectedFuelType(): string {
    return this._selectedFuelType;
  }
  public set selectedFuelType(value: string) {
    this._selectedFuelType = value;
  }
  private _selectedAvailableCars: string = "";
  public get selectedAvailableCars(): string {
    return this._selectedAvailableCars;
  }
  public set selectedAvailableCars(value: string) {
    this._selectedAvailableCars = value;
  }
  private _dropdownSelection: string = 'all';
  public get dropdownSelection(): string {
    return this._dropdownSelection;
  }
  public set dropdownSelection(value: string) {
    this._dropdownSelection = value;
  }

  @Output() filterApplied = new EventEmitter<any>();

  constructor(private carService: ServiceDisplayCars) {}

  ngOnInit(): void {
    this.carService.searchCars().subscribe((cars) => {
      this.allCars = cars;
      this.updateFilterOptions();
    });
  }

  updateFilterOptions(): void {
    this.brands = [...new Set(this.allCars.map((car) => car.brand))];
    this.models = [...new Set(this.allCars.map((car) => car.model))];
    this.fuelTypes = [...new Set(this.allCars.map((car) => car.fuelType))];
  }

  onBrandChange(): void {
    this.models = [
      ...new Set(
        this.allCars
          .filter(
            (car) => !this.selectedBrand || car.brand === this.selectedBrand
          )
          .map((car) => car.model)
      ),
    ];
    this.fuelTypes = [
      ...new Set(
        this.allCars
          .filter(
            (car) => !this.selectedBrand || car.brand === this.selectedBrand
          )
          .map((car) => car.fuelType)
      ),
    ];
  }

  onModelChange(): void {
    this.brands = [
      ...new Set(
        this.allCars
          .filter(
            (car) => !this.selectedModel || car.model === this.selectedModel
          )
          .map((car) => car.brand)
      ),
    ];
    this.fuelTypes = [
      ...new Set(
        this.allCars
          .filter(
            (car) => !this.selectedModel || car.model === this.selectedModel
          )
          .map((car) => car.fuelType)
      ),
    ];
  }

  onFuelTypeChange(): void {
    this.brands = [
      ...new Set(
        this.allCars
          .filter(
            (car) =>
              !this.selectedFuelType || car.fuelType === this.selectedFuelType
          )
          .map((car) => car.brand)
      ),
    ];
    this.models = [
      ...new Set(
        this.allCars
          .filter(
            (car) =>
              !this.selectedFuelType || car.fuelType === this.selectedFuelType
          )
          .map((car) => car.model)
      ),
    ];
  }

  resetFilters(): void {
    this.selectedBrand = "";
    this.selectedModel = "";
    this.selectedFuelType = "";
    this.onDropdownChange(event)
    this.updateFilterOptions();
    this.applyFilter();
  }

  applyFilter(): void {
    this.carService
      .searchCars(this.selectedBrand, this.selectedModel, this.selectedFuelType)
      .subscribe((cars) => {
        if (this.dropdownSelection === 'available') {
          this.loadRentalsAndApplyFilter(cars);
        } else {
          this.filterApplied.emit(cars);
        }
      });
  }

  // Methode om dropdown selectie bij te houden
  onDropdownChange(event: Event): void {
    this.dropdownSelection = (event.target as HTMLSelectElement).value;
  }

  // Methode om rentals te laden en de filter toe te passen
  loadRentalsAndApplyFilter(cars: Cars[]): void {
    this.carService.getRentals().subscribe({
      next: (rentals) => {
        const todayTimestamp = new Date().getTime();
        const availableCars = cars.filter(car => {
          const rental = rentals.find(r => r.licensePlate === car.licensePlate);
          if (rental) {
            const returnDate = new Date(rental.dateOfReturn).getTime();
            return returnDate < todayTimestamp;
          }
          return true;
        });
        this.filterApplied.emit(availableCars);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UploadCarService } from '../service/uploadCar-service/uploadCar.service';
import { Cars } from '../data/interfaces/cars';

@Component({
  selector: 'app-upload-cars',
  templateUrl: './upload-cars.component.html',
  styleUrls: ['./upload-cars.component.css']
})
export class UploadCarsComponent implements OnInit {

  private _errorMessage: string = '';
  public get errorMessage(): string {
    return this._errorMessage;
  }
  public set errorMessage(value: string) {
    this._errorMessage = value;
  }
  private _successMessage: string = '';
  public get successMessage(): string {
    return this._successMessage;
  }
  public set successMessage(value: string) {
    this._successMessage = value;
  }
  private _authorized: boolean = true;
  public get authorized(): boolean {
    return this._authorized;
  }
  public set authorized(value: boolean) {
    this._authorized = value;
  }

  constructor(private uploadCarService: UploadCarService) {}

  ngOnInit(): void {
    this.uploadCarService.checkAuthorization().subscribe({
      next: () => {
        this.authorized = true;
      },
      error: error => {
        if (error.message === 'Unauthorized') {
          this.authorized = false;
          this.errorMessage = 'You are not authorized to view this page.';
        }
      }
    });
  }

createFormData(form: NgForm, fileInput: HTMLInputElement): FormData {
  const formData = new FormData();
  formData.append('licensePlate', form.value.licensePlate);
  formData.append('brand', form.value.brand);
  formData.append('model', form.value.model);
  formData.append('transmission', form.value.transmission);
  formData.append('buildYear', form.value.buildYear);
  formData.append('fuelType', form.value.fuelType);
  formData.append('mileage', form.value.mileage);
  formData.append('carImage', fileInput.files[0]);
  return formData;
}

handleSuccess(form: NgForm, fileInput: HTMLInputElement): void {
  form.reset();
  fileInput.value = '';
  this.errorMessage = '';
  this.successMessage = 'Car added successfully!';
  setTimeout(() => {
    this.successMessage = '';
  }, 5000);
}

handleError(error: any): void {
  this.successMessage = '';
  if (error.status === 400) {
    const field = error.error.field || error.error.error;
    this.errorMessage = `Please fill in the ${field} field correctly.`;
  } else if (error.status === 404) {
    this.errorMessage = 'Please upload a car image.';
  } else {
    this.errorMessage = 'An unexpected error occurred. Please try again.';
  }
}

onSubmit(form: NgForm, fileInput: HTMLInputElement) {
  if (form.valid && fileInput.files) {
    const formData = this.createFormData(form, fileInput);
    this.uploadCarService.uploadCar(formData).subscribe({
      next: () => this.handleSuccess(form, fileInput),
      error: error => this.handleError(error)
    });
  }
}

}

import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JourneyService } from "../service/journey-service/journey.service";
import { Router } from "@angular/router";
import { of } from "rxjs/internal/observable/of";

@Component({
  selector: "app-journey-form",
  templateUrl: "./journey-form.component.html",
  styleUrl: "./journey-form.component.css",
})
export class JourneyFormComponent {
  private _form: FormGroup;
  private _submitted: boolean = false;

  public get form(): FormGroup {
    return this._form;
  }

  private set form(value: FormGroup) {
    this._form = value;
  }

  public get submitted(): boolean {
    return this._submitted;
  }

  private set submitted(value: boolean) {
    this._submitted = value;
  }

  constructor(
    private fb: FormBuilder,
    private journeyService: JourneyService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.form = this.fb.group({
      type: ["", Validators.required],
      date: ["", Validators.required, this.dateValidator],
      transport: ["", Validators.required],
      fuelType: [""],
      addressFrom: [""],
      addressTo: [""],
      distance: [0, Validators.min(0.01)],
      price: [0, Validators.min(0)],
    });

    // Subscribe to changes in the transport type control
    this.form.get("transport").valueChanges.subscribe((value) => {
      if (value === "Car") {
        this.form.get("fuelType").setValidators(Validators.required); // Add required validator
      } else {
        this.form.get("fuelType").clearValidators(); // Remove validators
      }
      this.form.get("fuelType").updateValueAndValidity(); // Update validation status
    });

  }

  private getTransportValue(): string {
    let transportValue = this.form.value.transport;

    if (transportValue === "Car") {
      transportValue = this.form.value.fuelType + " " + transportValue;
    }

    return transportValue;
  }

  private getFormValues() {
    const values = this.form.value;

    const formValues = {
      date: values.date,
      type: values.type,
      addressFrom: values.addressFrom,
      addressTo: values.addressTo,
      distance: values.distance,
      price: values.price,
      transport: this.getTransportValue(),
    };

    return formValues;
  }

  private dateValidator(control: AbstractControl) {
    const currentDate = new Date();
    const controlDate = new Date(control.value);

    return of(controlDate > currentDate && { future: true } || null)
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formValues = this.getFormValues();

    this.journeyService.createJourney(formValues).subscribe(
      () => {
        this.router.navigate(['/journeys']);
      }
    );
  }
}

// /**
//  * This file contains the unit tests for the LoginComponent.
//  * The LoginComponent is responsible for handling the login functionality.
//  * It tests the form validation and submission.
//  *
//  * @packageDocumentation
//  */
// import { ComponentFixture, TestBed } from "@angular/core/testing";
// import { ReactiveFormsModule } from "@angular/forms";
// import { LoginComponent } from "./login.component";
// import { HttpClientModule } from "@angular/common/http";

// describe("LoginComponent", () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [ReactiveFormsModule, HttpClientModule], // add ReactiveFormsModule to imports
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });

//   it("form invalid when empty", () => {
//     expect(component.form.valid).toBeFalsy(); // expect the form to be initially invalid
//   });

//   it("username field validity", () => {
//     let errors = {};
//     let username = component.form.controls["username"];
//     expect(username.valid).toBeFalsy();

//     // Perform check for required field
//     errors = username.errors || {};
//     expect(errors["required"]).toBeTruthy();

//     // Set username to a valid value
//     username.setValue("testuser");
//     errors = username.errors || {};
//     expect(errors["required"]).toBeFalsy();
//   });

//   it("password field validity", () => {
//     let errors = {};
//     let password = component.form.controls["password"];
//     expect(password.valid).toBeFalsy();

//     // Perform check for required field
//     errors = password.errors || {};
//     expect(errors["required"]).toBeTruthy();

//     // Set password to a valid value
//     password.setValue("testpassword");
//     errors = password.errors || {};
//     expect(errors["required"]).toBeFalsy();
//   });

  // it("submitting a form", () => {
  //   expect(component.form.valid).toBeFalsy();
  //   component.form.controls["username"].setValue("testuser");
  //   component.form.controls["password"].setValue("testpassword");
  //   expect(component.form.valid).toBeTruthy();

  //   // Trigger the ngSubmit
  //   component.onSubmit();
  // });


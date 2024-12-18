// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { RegisterComponent } from './register.component';
// import { ReactiveFormsModule } from '@angular/forms';

// describe('RegisterComponent', () => {
//   let component: RegisterComponent;
//   let fixture: ComponentFixture<RegisterComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [RegisterComponent],
//       imports: [ReactiveFormsModule]
//     })
//       .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(RegisterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  // it('should create the component', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should create a form with required fields', () => {
  //   const form = component.form;
  //   expect(form.contains('firstName')).toBeTruthy();
  //   expect(form.contains('middleName')).toBeTruthy();
  //   expect(form.contains('lastName')).toBeTruthy();
  //   expect(form.contains('email')).toBeTruthy();
  //   expect(form.contains('password')).toBeTruthy();
  //   expect(form.contains('confirmPassword')).toBeTruthy();
  // });

  // it('should mark firstName field as invalid if empty', () => {
  //   const firstName = component.form.controls['firstName'];
  //   expect(firstName.valid).toBeFalsy();

  //   // Set firstName to empty value
  //   firstName.setValue('');
  //   expect(firstName.errors['required']).toBeTruthy();
  // });

  // it('should mark email field as invalid if not a valid email format', () => {
  //   const email = component.form.controls['email'];
  //   expect(email.valid).toBeFalsy();

  //   // Set email to invalid value
  //   email.setValue('invalidemail');
  //   expect(email.errors['email']).toBeTruthy();
  // });

  // it('should mark password field as invalid if less than 6 characters', () => {
  //   const password = component.form.controls['password'];
  //   expect(password.valid).toBeFalsy();

  //   // Set password to less than 6 characters
  //   password.setValue('12345');
  //   expect(password.errors['minlength']).toBeTruthy();
  // });
// });
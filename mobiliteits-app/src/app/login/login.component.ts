/**
 * Represents the LoginComponent class.
 * This component is responsible for handling the login functionality.
 */
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../service/login-service/login.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  form: FormGroup;
  submitted = false;

  succesRegister = false;

  /**
   * Constructs a new instance of the LoginComponent class.
   * @param fb - The FormBuilder instance used to create the form.
   */
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.succesRegister = false;
  }

  ngOnInit() {
    // Check for state data from the router
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state as { call: boolean };
      console.log(state);
      if (state) {
        this.succesRegister = state.call;
      }
    } else {
      // Alternative approach to access the state using queryParams
      this.route.queryParams.subscribe(params => {
        const call = params['call'];
        if (call) {
          this.succesRegister = call === 'true';
        }
      });
    }
  }

  /**
   * Gets the form controls.
   * @returns The form controls.
   */
  get data() {
    return this.form.controls;
  }

  /**
   * Handles the form submission.
   * Sets the submitted flag to true and logs the form value to the console.
   */
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const formValues = this.form.value;

    this.loginService.createLogInSession(
      formValues.username,
      formValues.password,
    );
  }
}

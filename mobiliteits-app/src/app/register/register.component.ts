import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../service/register-service/register.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  form: FormGroup;
  private _submitted = false;

  constructor(private registerService: RegisterService, private fb: FormBuilder) { }

  public ngOnInit() {
    this.formCreate();
  }

  private formCreate() {
    this.form = this.fb.group({
      firstName: ["", Validators.required],
      middleName: [""],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
    });
  }


  get data() {
    return this.form.controls;
  }

  public get submitted() {
    return this._submitted;
  }
  public set submitted(value) {
    this._submitted = value;
  }

  public onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    /**
    * @author Joey van der Kuijl
    *
    * passwordCheck
    */
    let form = this.form.value;
    if (form.password !== form.confirmPassword) {
      console.log('Password and Confirm Password do not match');
    } else {
      this.createAccount(this.form.value);
    }
  }

  /**
 * @author Joey van der Kuijl
 *
 * createAccount
 */
  public createAccount(formData: any) {
    this.registerService
      .createNewAccount(formData)
      .subscribe((info) => {
        // console.log(info);
        this.form.reset();
      });
  }
}

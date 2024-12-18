import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class LoginService {
  httpOptions = {
    withCredentials: true,
  };

  constructor(private http: HttpClient, private router: Router) { }

  public createLogInSession(email: string, password: string): void {
    this.http
      .post(
        `http://localhost:3002/login`,
        {
          email: email,
          password: password,
        },
        this.httpOptions,
      )
      .subscribe((response: any) => {
        if (response.success) {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['']);
        } else {
          console.log(response);
        }
      });
  }
}

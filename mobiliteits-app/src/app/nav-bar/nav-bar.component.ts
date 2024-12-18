import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isLoggedIn: boolean = false;

  constructor(private readonly authService: AuthService) { }

  public ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  public logout(): void {
    this.authService.logout();
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
  }
}

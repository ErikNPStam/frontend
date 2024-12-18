import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'mobiliteits-app';

  /**
   * Check if the current page is the home page.
   * @returns - True if the current page is the home page, false otherwise.
   */
  public isHomePage(): boolean {
    return window.location.pathname === '/';
  }
  
}

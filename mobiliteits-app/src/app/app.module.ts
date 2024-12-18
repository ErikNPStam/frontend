
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsdisplayComponent } from './cars-page-component/cars-page-component.component';
import { CarDetailpageComponent } from './car-detailpage/car-detailpage.component';
import { ProductPageComponent } from './product-page/product-page.component'
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { WorkersComponent } from './workers/workers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { JourneyDetailComponent } from './journey-detail/journey-detail.component';
import { JourneysComponent } from './journeys/journeys.component';
import { JourneyComponent } from './journey/journey.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SwiperModule } from "swiper/angular";


import { MatSnackBarModule } from '@angular/material/snack-bar';

import { JourneyFormComponent } from "./journey-form/journey-form.component";
import { CarDisplayFilterComponent } from "./car-display-filter/car-display-filter.component";
import { UploadCarsComponent } from './upload-cars/upload-cars.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    CarsdisplayComponent,
    AppComponent,
    CarDetailpageComponent,
    ProductPageComponent,
    NavBarComponent,
    WorkersComponent,
    JourneyDetailComponent,
    JourneysComponent,
    RegisterComponent,
    JourneyComponent,
    AdminPanelComponent,
    LoginComponent,
    JourneyFormComponent,
    CarDisplayFilterComponent,
    AdminReportComponent,
    LoginComponent,
    UploadCarsComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    NgxPaginationModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }

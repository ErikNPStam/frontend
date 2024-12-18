import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WorkersComponent } from "./workers/workers.component";
import { CarDetailpageComponent } from "./car-detailpage/car-detailpage.component";
import { ProductPageComponent } from "./product-page/product-page.component";

import { JourneyComponent } from "./journey/journey.component";
import { JourneysComponent } from "./journeys/journeys.component";
import { RegisterComponent } from "./register/register.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { CarsdisplayComponent } from "./cars-page-component/cars-page-component.component";
import { LoginComponent } from "./login/login.component";
import { JourneyFormComponent } from "./journey-form/journey-form.component";
import { UploadCarsComponent } from "./upload-cars/upload-cars.component";
import { AdminReportComponent } from "./admin-report/admin-report.component";

const routes: Routes = [
  { path: "displayCars", component: CarsdisplayComponent },
  { path: "cardetail/:id", component: CarDetailpageComponent },
  { path: "products", component: ProductPageComponent },
  { path: "workers", component: WorkersComponent },
  { path: "journeys/all", component: JourneyComponent },
  { path: "journeys", component: JourneysComponent },
  { path: "journey/form", component: JourneyFormComponent },
  { path: "register", component: RegisterComponent },
  {path: "admin/cars/upload", component: UploadCarsComponent},
  { path: "admin-panel", component: AdminPanelComponent },
  { path: "login", component: LoginComponent },
  { path: "admin-report", component: AdminReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

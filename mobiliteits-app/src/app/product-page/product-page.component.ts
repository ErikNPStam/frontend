import { Component } from '@angular/core';
import { ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent {
  meals: string[] = [
    "onion soup with ketchup",
    "avacado maki on a stick with cheese",
    "beans on toast on a stick with cheese",
    "avacado maki with chips",
    "wiener schnitzel drizzled with cheese sauce",
    "yorkshire pudding with a side salad",
    "bak choi a la king",
    "cheeseburger with ketchup",
    "beans on toast on a bed of cabbage",
    "sausage in pitta bread",
    "onion soup with ketchup",
    "avacado maki on a stick with cheese",
    "beans on toast on a stick with cheese",
    "avacado maki with chips",
    "wiener schnitzel drizzled with cheese sauce",
    "yorkshire pudding with a side salad",
    "bak choi a la king",
    "cheeseburger with ketchup",
    "beans on toast on a bed of cabbage",
    "sausage in pitta bread",
  ];

  page: number = 1;
}
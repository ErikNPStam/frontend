import { Injectable } from '@angular/core';
import { Journey } from '../data/interfaces/journey';

const JOURNEYS: Journey[] = [
  {
    type: 'Commuting',
    date: new Date('2024-04-16'),
    vehicle: 'Car',
    address_from: {
      street: 'Jonkheer van de Pollstraat',
      postcode: '2151AD',
      city: 'Nieuw-Vennep',
      housenumber: 41,
    },
    address_to: {
      street: 'Wibautstraat',
      postcode: '1091 GH',
      city: 'Amsterdam',
      housenumber: 3,
    },
    distance: 20,
    price: 0,
    fuel_type: 'Gasoline',
    emissions: 2,
    email: 'luka.piersma@hva.nl',
  },
  {
    type: 'Business',
    date: new Date('2024-04-17'),
    vehicle: 'Train',
    address_from: {
      street: 'Jonkheer van de Pollstraat',
      postcode: '2151AD',
      city: 'Nieuw-Vennep',
      housenumber: 41,
    },
    address_to: {
      street: 'Wibautstraat',
      postcode: '1091 GH',
      city: 'Amsterdam',
      housenumber: 3,
    },
    distance: 20,
    price: 5,
    email: 'luka.piersma@hva.nl',
    fuel_type: null,
    emissions: 2,
  },
  {
    type: 'Business',
    date: new Date('2024-04-18'),
    vehicle: 'Metro',
    address_from: {
      street: 'Jonkheer van de Pollstraat',
      postcode: '2151AD',
      city: 'Nieuw-Vennep',
      housenumber: 41,
    },
    address_to: {
      street: 'Wibautstraat',
      postcode: '1091 GH',
      city: 'Amsterdam',
      housenumber: 3,
    },
    distance: 10,
    price: 2.5,
    fuel_type: null,
    emissions: 1,
    email: 'luka.piersma@hva.nl',
  },
  {
    type: 'Commuting',
    date: new Date('2024-04-19'),
    vehicle: 'Car',
    address_from: {
      street: 'Jonkheer van de Pollstraat',
      postcode: '2151AD',
      city: 'Nieuw-Vennep',
      housenumber: 41,
    },
    address_to: {
      street: 'Wibautstraat',
      postcode: '1091 GH',
      city: 'Amsterdam',
      housenumber: 3,
    },
    distance: 20,
    price: 0,
    fuel_type: 'Gasoline',
    emissions: 2,
    email: 'luka.piersma@hva.nl',
  },
];

@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  constructor() {}

  getJourneys(): Journey[] {
    return JOURNEYS;
  }
}

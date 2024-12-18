import { Address } from './address';

export interface Journey {
  type: string;
  date: Date;
  vehicle: string;
  address_from: Address;
  address_to: Address;
  distance: number;
  price: number;
  fuel_type: string;
  emissions: number;
  email: string;
}

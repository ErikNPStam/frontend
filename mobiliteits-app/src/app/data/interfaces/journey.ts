export interface Journey {
  type: string;
  date: string;
  vehicle: string;
  addressFrom: string;
  addressTo: string;
  distance: number;
  price: number;
  fuelType: string;
  emissions: number;
  workerId: number;
  licensePlate: string;
  createdAt?: string;
}

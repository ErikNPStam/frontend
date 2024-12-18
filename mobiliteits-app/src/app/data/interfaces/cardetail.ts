export interface CarDetailApiResponse {
  licensePlate: string; // Adjusted to camelCase
  model: string;
  brand: string;
  transmission: string;
  mileage: number;
  buildYear: number; // Adjusted to camelCase
  fuelType: string; // Adjusted to camelCase
  carImage: string | null; // Assuming you have an image URL field
}


export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image?: string;
  rating: number;
  votes: number;
  verified?: boolean;
  clinic: string;
  distance?: any;
  availability: "available" | "not-available" | "next-available";
  nextAvailable?: string;
  schedule?: string[];
  price: number;
  badges?: string[];
}

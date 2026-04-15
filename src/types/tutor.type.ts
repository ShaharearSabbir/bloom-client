import { Category } from "@/types/category.type";

export interface Tutor {
  id: string;
  name: string;
  bio: string;
  avatarUrl?: string;
  category: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  isVerified?: boolean;
}

export interface FilterData {
  categories: Category[];
  priceRange: {
    min: number;
    max: number;
  };
}

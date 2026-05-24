import { Category } from "@/types/category.type";
import { Review } from "./review.type";

export interface Tutor {
  id: string;
  name: string;
  bio: string;
  avatarUrl?: string;
  category: string;
  categoryId: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  reviews?: Review[];
  isVerified?: boolean;
  availability?: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
  upcomingBookings?: {
    bookingDate: string;
    endTime: string;
    startTime: string;
  }[];
}

export interface FilterData {
  categories: Category[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface TutorStats {
  totalStudent: number;
  totalEarnings: number;
  avgRating: number;
  totalSessions: number;
  upcomingBooking: {
    id: string;
    bookingDate: Date;
    startTime: string;
    categoryName: string;
    studentName: string;
  }[];
}

export interface Student {
  name: string;
  id: string;
  email: string;
  image: string | null;
  createdAt: Date;
}

export interface StudentStats {
  bookingCount: number;
  upcomingBooking: {
    id: string;
    bookingDate: Date;
    startTime: string;
    categoryName: string;
    tutorName: string;
  }[];
}

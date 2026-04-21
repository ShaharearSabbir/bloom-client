export type Booking = {
  id: string;
  tutorId: string;
  studentId: string;
  categoryId: string;
  bookingDate: Date;
  startTime: string;
  endTime: string;
  totalFees: number;
  status: "PENDING" | "CONFIRM" | "CANCELED" | "COMPLETED";
  createdAt: Date;
  updatedAt: Date;
};

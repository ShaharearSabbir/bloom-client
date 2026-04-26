export interface Review {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  tutorId: string;
  studentId: string;
  status: CommentStatus;
  rating: number;
  comment: string;
}

export enum CommentStatus {
  APPROVED,
  REJECTED,
}

export interface TutorReview {
  reviews: {
    tutorId: string;
    rating: number;
    comment: string;
    id: string;
    status: CommentStatus;
    createdAt: Date;
    updatedAt: Date;
    studentId: string;
    student: {
      name: string;
      id: string;
      image: string | null;
    };
  }[];
  stats: {
    avgRating: number;
    reviewCount: number;
    happyStudents: number;
  };
}

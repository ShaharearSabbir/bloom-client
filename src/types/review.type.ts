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

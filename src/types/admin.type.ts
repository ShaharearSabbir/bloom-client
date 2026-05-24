import { Meta } from "./action.type";
import { UserRole } from "./userRole";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  image: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
};

export enum UserStatus {
  ACTIVE,
  INACTIVE,
}

export interface Booking {
  id: string;
  status: string;
  tutor: {
    id: string;
    name: string;
  };
  student: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
}

export interface AdminStats {
  totalStudents: number;
  totalTutors: number;
  totalBookings: number;
}

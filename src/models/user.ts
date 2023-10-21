export interface IUser {
  id: number;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  lastName: string;
  region: {
    name: string;
  }
  role: "Admin" | "SuperAdmin" | null;
}
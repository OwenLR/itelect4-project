// ===== INTERFACES =====
// An interface defines the SHAPE of an object -- what fields it must have.
export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "security_admin"; // only these values
  isActive: boolean;
}
export interface Item {
  id: number;
  title: string;
  description: string;
  location: string;
  datePosted: Date;
  type: "lost" | "found"; // only these values
}
export interface Claim {
  id: number;
  itemId: number;
  claimantId: number;
  status: ClaimStatus;
  submittedAt: Date;
}
// ===== GENERIC INTERFACE =====
// ApiResponse<T> can wrap ANY data type -- every future GT reuses this
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
// ===== UTILITY TYPES =====
// Partial<T> -- every field becomes optional
export type UserUpdate = Partial<User>;
// Pick<T, K> -- keep ONLY the listed fields
export type UserPreview = Pick<User, "id" | "name" | "role">;
// ===== ENUM =====
// Regular enum -- exists at runtime; can be looped over or reverse-mapped
export enum ClaimStatus {
  Pending,
  UnderReview,
  Approved,
  Rejected,
}
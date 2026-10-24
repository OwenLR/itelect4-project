// ===== INTERFACES =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "security_admin";
  isActive: boolean;
}
export interface Item {
  id: number;
  title: string;
  description: string;
  location: string;
  datePosted: Date;
  type: "lost" | "found";
}
export interface Claim {
  id: number;
  itemId: number;
  claimantId: number;
  contactEmail: string; // added Session 8
  status: ClaimStatus;
  submittedAt: Date;
}

// ===== GENERIC INTERFACE =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
export type UserUpdate = Partial<User>;
export type UserPreview = Pick<User, "id" | "name" | "role">;

// ===== ENUM =====
export enum ClaimStatus {
  Pending,
  UnderReview,
  Approved,
  Rejected,
}

// ===== API TYPES =====
export type ApiItem = Omit<Item, "id" | "datePosted"> & {
  id: string;           // 24 hex characters, from MongoDB's _id
  datePosted: string;   // an ISO string, never a Date object
};
export type NewItem = Omit<ApiItem, "id">;

// SESSION 10: claimantId and itemId are 24-character strings on the wire,
// and the server fills in claimantId and submittedAt itself.
export type ApiClaim = Omit<
  Claim,
  "id" | "claimantId" | "itemId" | "submittedAt"
> & {
  id: string;
  claimantId: string;
  itemId: string;
  submittedAt: string;
};

// What we SEND when creating one -- the two fields the form has.
export type NewClaim = Pick<ApiClaim, "itemId" | "contactEmail">;

// What /api/auth/register sends back, and what sits inside the login reply.
export type ApiUser = Omit<User, "id"> & {
  id: string;
};

// What /api/auth/login sends back.
export interface AuthReply {
  token: string;
  user: ApiUser;
}

// ===== SESSION 11: what POST /api/ai sends back =======================
// itelect4-backend's Review type is derived from a Zod schema in
// src/schemas/review.ts, and this has to say the same thing. Nothing
// checks that they agree -- you do.
export interface AiReview {
  summary: string;
  strengths: string[];
  improvements: string[];
  matchability: "strong" | "fair" | "weak";
}
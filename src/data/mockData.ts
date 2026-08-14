import type { User, Item, Claim } from "../types/index";
import { ClaimStatus } from "../types/index";

export const student: User = {
  id: 1, name: "Juan dela Cruz", email: "juan@example.com",
  role: "student", isActive: true,
};

export const allItems: Item[] = [
  { id: 1, title: "Black Backpack", description: "Left near the library entrance",
    location: "Main Library", datePosted: new Date(), type: "found" },
  { id: 2, title: "Blue Umbrella", description: "Forgotten in Room 301",
    location: "Engineering Building", datePosted: new Date(), type: "lost" },
  { id: 3, title: "Student ID Card", description: "Found near the canteen tables",
    location: "Canteen", datePosted: new Date(), type: "found" },
];

export const allClaims: Claim[] = [
  { id: 1, itemId: 1, claimantId: 1, status: ClaimStatus.Pending, submittedAt: new Date() },
  { id: 2, itemId: 3, claimantId: 1, status: ClaimStatus.Approved, submittedAt: new Date() },
];
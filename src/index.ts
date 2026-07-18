import type { User, Item, Claim, ApiResponse, UserUpdate, UserPreview } from "../types/index";
import { ClaimStatus } from "../types/index";

// ===== PRIMITIVE TYPE ANNOTATIONS =====
const projectName: string = "itelect4-project";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;
function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}
function logMessage(message: string): void {
  console.log(message);
}
logMessage(greet(projectName, currentYear));

// ===== SPECIAL TYPES =====
let anything: any = "hello";
anything = 42;
anything = true;
let userInput: unknown = "test";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}
function throwError(message: string): never {
  throw new Error(message);
}

// ===== USING INTERFACES =====
const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};
const item: Item = {
  id: 1,
  title: "Black Backpack",
  description: "Left near the library entrance",
  location: "Main Library",
  datePosted: new Date(),
  type: "found",
};
console.log(student);
console.log(item);

// ===== TYPE NARROWING =====
function processInput(input: string | number): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input.toFixed(2);
}
function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return value;
}
console.log(processInput("hello"));
console.log(processInput(3.14159));
console.log(formatDate(new Date()));

// ===== GENERIC FUNCTIONS =====
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}
function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((entry) => entry.id === id);
}
const firstItem = getFirst<Item>([item]);
const foundItem = getById<Item>([item], 1);
console.log(firstItem?.title);
console.log(foundItem?.location);

// ===== GENERIC INTERFACE USAGE =====
const userResponse: ApiResponse<User> = {
  success: true,
  data: student,
};
const itemResponse: ApiResponse<Item[]> = {
  success: true,
  data: [item],
};
console.log(userResponse.data.name);

// ===== USING UTILITY TYPES =====
const patch: UserUpdate = { name: "Juan D. Cruz" };
const preview: UserPreview = { id: 1, name: "Juan dela Cruz", role: "student" };
console.log(patch);
console.log(preview);

// ===== USING ENUMS =====
let status: ClaimStatus = ClaimStatus.Pending;
console.log(ClaimStatus[status]);
status = ClaimStatus.UnderReview;
console.log(status === ClaimStatus.UnderReview);

const claim: Claim = {
  id: 1,
  itemId: item.id,
  claimantId: student.id,
  status: ClaimStatus.Pending,
  submittedAt: new Date(),
};
console.log(claim);
# Campus Lost & Found Tracker

A simple system for posting and claiming lost or found items on campus. Students can post an item they lost or found, and security admins can review and verify claims made against those posts.

## Types Defined

- `User` - a student or security admin (`role: "student" | "security_admin"`)
- `Item` - a lost or found post (`type: "lost" | "found"`)
- `Claim` - a user's claim on an item, tracked through `ClaimStatus`
- `ApiResponse<T>` - generic wrapper for any API response shape
- `UserUpdate` - `Partial<User>`, for update payloads
- `UserPreview` = `Pick<User, "id" | "name" | "role">`, a lightweight preview
- `ClaimStatus` = enum: `Pending`, `UnderReview`, `Approved`, `Rejected`

## Install & Run

\`\`\`bash
npm install
npx ts-node src/index.ts
\`\`\`
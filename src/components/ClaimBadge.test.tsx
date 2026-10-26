import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ClaimBadge from "./ClaimBadge";
import { ClaimStatus } from "../types/index";
import type { ApiClaim } from "../types/index";

// One claim shaped exactly like a row from GET /api/claims. Typed, so a
// field that does not exist in ApiClaim is a compile error here too.
const pending: ApiClaim = {
  id: "665f1c2ab4e8d3a1f0c9e101",
  itemId: "665f1c2ab4e8d3a1f0c9e201",
  claimantId: "665f1c2ab4e8d3a1f0c9e001",
  contactEmail: "juan@dlsl.edu.ph",
  status: ClaimStatus.Pending,
  submittedAt: "2026-10-17T02:15:00.000Z",
};

describe("ClaimBadge", () => {
  it("shows the contact email and a Pending status", () => {
    render(<ClaimBadge claim={pending} />);

    expect(screen.getByText("Contact: juan@dlsl.edu.ph")).toBeInTheDocument();
    expect(screen.getByText("Status: Pending")).toBeInTheDocument();
  });

  it("shows Approved when the claim has been approved", () => {
    // Everything from pending, then only the status changed.
    const approved: ApiClaim = { ...pending, status: ClaimStatus.Approved };

    render(<ClaimBadge claim={approved} />);

    expect(screen.getByText("Status: Approved")).toBeInTheDocument();
    expect(screen.queryByText("Status: Pending")).not.toBeInTheDocument();
  });
});
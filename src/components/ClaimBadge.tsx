import type { Claim } from "../types/index";
import { ClaimStatus } from "../types/index";

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim, children }) => {
  return (
    <div className="claim-badge">
      <p>Claim #{claim.id}</p>
      <p>Status: {ClaimStatus[claim.status]}</p>
      {children}
    </div>
  );
};

export default ClaimBadge;
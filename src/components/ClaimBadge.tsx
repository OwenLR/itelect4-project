import type { ApiClaim } from "../types/index";
import { ClaimStatus } from "../types/index";

interface ClaimBadgeProps {
  claim: ApiClaim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim, children }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4
      shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <p className="text-gray-900 dark:text-white">Claim #{claim.id}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Status: {ClaimStatus[claim.status]}
      </p>
      {children}
    </div>
  );
};

export default ClaimBadge;
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiClaim } from "../types/index";
import { ClaimStatus } from "../types/index";
import ClaimBadge from "../components/ClaimBadge";
import { fetchClaims, createClaim } from "../api/client";

function ClaimsPage() {
  const [itemId, setItemId] = useState<string>("");
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery<ApiClaim[]>({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  const addClaim = useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      setItemId("");
    },
  });

  const handleAdd = (): void => {
    addClaim.mutate({
      itemId: Number(itemId),
      claimantId: 1,
      status: ClaimStatus.Pending,
      submittedAt: new Date().toISOString(),
    });
  };

  if (isPending) {
    return <div className="animate-pulse p-6">Loading claims...</div>;
  }
  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load claims.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">My Claims</h2>
      <div className="mb-6 flex gap-2">
        <input value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          placeholder="Item ID to claim"
          className="w-full rounded border border-gray-300 p-2" />
        <button onClick={handleAdd}
          disabled={itemId === "" || addClaim.isPending}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400">
          {addClaim.isPending ? "Saving..." : "Add"}
        </button>
      </div>
      {addClaim.isError && (
        <p className="mb-4 text-sm text-red-700">
          {addClaim.error.message}</p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((c) => (
          <ClaimBadge key={c.id} claim={c}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Item ID: {c.itemId}</p>
          </ClaimBadge>
        ))}
      </div>
    </div>
  );
}

export default ClaimsPage;
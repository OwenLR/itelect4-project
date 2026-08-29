import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiItem, ApiClaim } from "../types/index";
import { claimSchema } from "../schemas/claimSchema";
import type { ClaimFormValues } from "../schemas/claimSchema";
import ClaimBadge from "../components/ClaimBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchItems, fetchClaims, createClaim } from "../api/client";

function ClaimsPage() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClaimFormValues>({
    resolver: zodResolver(claimSchema),
    mode: "onBlur",
    defaultValues: { itemId: "", contactEmail: "" },
  });

  // Same queryKey as ItemsPage, so this dropdown comes out of the cache.
  const items = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const { data, isPending, isError } = useQuery<ApiClaim[]>({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  const addClaim = useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      reset();
    },
  });

  // handleSubmit only calls this after the schema passes.
  const onSubmit = (values: ClaimFormValues): void => {
    addClaim.mutate({
      itemId: Number(values.itemId),
      claimantId: 1,
      contactEmail: values.contactEmail,
      status: 0,
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

      <form onSubmit={handleSubmit(onSubmit)}
        className="mb-6 grid gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <div className="grid gap-1.5">
          <Label htmlFor="itemId" className="text-foreground">Item</Label>
          <select id="itemId" {...register("itemId")}
            className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm text-foreground">
            <option value="">Select an item...</option>
            {items.data?.map((i) => (
              <option key={i.id} value={i.id}>{i.title}</option>
            ))}
          </select>
          {errors.itemId && (
            <p className="text-sm text-red-600">{errors.itemId.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="contactEmail" className="text-foreground">Contact Email</Label>
          <Input id="contactEmail" {...register("contactEmail")}
            aria-invalid={errors.contactEmail ? true : undefined}
            placeholder="you@school.edu.ph" />
          {errors.contactEmail && (
            <p className="text-sm text-red-600">{errors.contactEmail.message}</p>
          )}
        </div>

        <Button type="submit"
          disabled={addClaim.isPending}
          className="justify-self-start">
          {addClaim.isPending ? "Saving..." : "Add claim"}
        </Button>
      </form>

      {addClaim.isError && (
        <p className="mb-4 text-sm text-red-700">{addClaim.error.message}</p>
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
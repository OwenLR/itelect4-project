import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AiReview } from "../types/index";
import { askAi } from "../api/client";
import { reviewFormSchema } from "../schemas/reviewSchema";
import type { ReviewFormValues } from "../schemas/reviewSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Record from Session 2: one entry for every value matchability can
// have. Add a fourth value to AiReview and this object stops compiling
// until it has a colour for it.
const MATCH_STYLE: Record<AiReview["matchability"], string> = {
  "strong": "bg-green-100 text-green-800",
  "fair":   "bg-yellow-100 text-yellow-800",
  "weak":   "bg-red-100 text-red-800",
};

function ReviewPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    // No mode: "onBlur" here. The button sits right under the error
    // message, and checking on blur makes the message appear or vanish
    // between pressing the button and letting go, so the click misses.
    defaultValues: { prompt: "" },
  });

  // A mutation, not a query: it runs when the button is pressed, never
  // on page load, and asking twice is two requests and two spent quotas.
  const review = useMutation({
    mutationFn: askAi,
  });

  const onSubmit = (values: ReviewFormValues): void => {
    review.mutate(values.prompt);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
        AI Review</h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Describe the item you lost and see how easily it could be matched
        before you submit a claim.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="prompt" className="text-foreground">
            Item description</Label>
          <textarea id="prompt" rows={6} {...register("prompt")}
            aria-invalid={errors.prompt ? true : undefined}
            placeholder="What it looks like, where and when you lost it, any marks only you would know..."
            className="rounded-lg border border-input bg-background p-2.5 text-sm text-foreground" />
          {errors.prompt && (
            <p className="text-sm text-red-600">{errors.prompt.message}</p>
          )}
        </div>

        <Button type="submit" disabled={review.isPending}
          className="justify-self-start">
          {review.isPending ? "Reviewing..." : "Review my description"}
        </Button>
      </form>

      {/* The API's own sentence: the rate limit, the quota, or a refusal
          from the schema -- never Google's raw error text. */}
      {review.isError && (
        <p className="mt-4 text-sm text-red-700">{review.error.message}</p>
      )}

      {review.data && (
        <div className="mt-6 grid gap-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <span className={`justify-self-start rounded px-2 py-0.5 text-sm font-semibold ${MATCH_STYLE[review.data.matchability]}`}>
            {review.data.matchability}
          </span>
          <p className="text-gray-900 dark:text-white">
            {review.data.summary}</p>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              What helps a match</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
              {review.data.strengths.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Add before you submit</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
              {review.data.improvements.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;
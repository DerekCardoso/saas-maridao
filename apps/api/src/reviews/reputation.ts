import type { ReviewStatus } from "@maridao/shared"

export const calculateReputation = (
  reviews: Array<{ rating: number; status: ReviewStatus }>
) => {
  const publicReviews = reviews.filter((review) => review.status !== "hidden")
  if (publicReviews.length === 0) return { rating: 0, reviewCount: 0 }

  const total = publicReviews.reduce((sum, review) => sum + review.rating, 0)
  return {
    rating: Number((total / publicReviews.length).toFixed(2)),
    reviewCount: publicReviews.length
  }
}

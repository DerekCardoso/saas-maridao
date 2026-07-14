import { getReviewById, getReviews, getReviewsByProviderId } from "../db"
import type { Review } from "../mock-data"

export async function getReviewService(id: string): Promise<Review | null> {
  return getReviewById(id)
}

export async function getAllReviewsService(): Promise<Review[]> {
  return getReviews()
}

export async function getProviderReviewsService(providerId: string): Promise<Review[]> {
  return getReviewsByProviderId(providerId)
}

export async function createReviewService(reviewData: Omit<Review, "id">): Promise<Review> {
  // Simulando criação de avaliação com dados mockados
  const newReview: Review = {
    id: `review-${Date.now()}`,
    ...reviewData,
  }
  return newReview
}

export async function updateReviewService(id: string, reviewData: Partial<Review>): Promise<Review | null> {
  const review = await getReviewById(id)
  if (!review) return null

  // Simulando atualização de avaliação com dados mockados
  return {
    ...review,
    ...reviewData,
  }
}

export async function deleteReviewService(id: string): Promise<boolean> {
  // Simulando exclusão de avaliação
  return true
}

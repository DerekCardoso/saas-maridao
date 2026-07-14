export interface RankedProvider {
  id: string
  isPremium: boolean
  rating: number
  reviewCount: number
  distanceKm: number
  lastActiveAt: Date
}

export const rankProviders = <T extends RankedProvider>(providers: T[]) =>
  [...providers].sort((left: T, right: T) => {
    if (left.isPremium !== right.isPremium) return left.isPremium ? -1 : 1
    if (left.rating !== right.rating) return right.rating - left.rating
    if (left.reviewCount !== right.reviewCount) return right.reviewCount - left.reviewCount
    if (left.distanceKm !== right.distanceKm) return left.distanceKm - right.distanceKm
    return right.lastActiveAt.getTime() - left.lastActiveAt.getTime()
  })

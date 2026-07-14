export const errorCodes = {
  unauthorized: "UNAUTHORIZED",
  forbidden: "FORBIDDEN",
  validationFailed: "VALIDATION_FAILED",
  profileNotFound: "PROFILE_NOT_FOUND",
  providerProfileNotFound: "PROVIDER_PROFILE_NOT_FOUND",
  providerNotApproved: "PROVIDER_NOT_APPROVED",
  appointmentConflict: "APPOINTMENT_CONFLICT",
  invalidAppointmentTransition: "INVALID_APPOINTMENT_TRANSITION",
  reviewAlreadyExists: "REVIEW_ALREADY_EXISTS",
  stripeWebhookInvalid: "STRIPE_WEBHOOK_INVALID",
  internalError: "INTERNAL_ERROR"
} as const

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes]

export interface ApiErrorResponse {
  code: ErrorCode
  message: string
  details: Record<string, unknown>
  requestId: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

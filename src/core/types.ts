// ─── Shared Types ───
// Types used across multiple features

export interface ApiResponse<T> {
  success: boolean
  data: T | null
  error: string | null
}

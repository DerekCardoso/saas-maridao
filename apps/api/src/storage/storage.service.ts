import { Injectable, ServiceUnavailableException } from "@nestjs/common"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

@Injectable()
export class StorageService {
  private readonly supabase: SupabaseClient

  constructor() {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error("Supabase storage environment is required")
    this.supabase = createClient(url, key, { auth: { persistSession: false } })
  }

  async createAvatarUpload(userId: string, extension: "jpg" | "png" | "webp") {
    const path = `${userId}/avatar-${Date.now()}.${extension}`
    const { data, error } = await this.supabase.storage
      .from("provider-avatars")
      .createSignedUploadUrl(path)

    if (error) throw new ServiceUnavailableException("Falha ao preparar upload.")

    return {
      path,
      token: data.token,
      signedUrl: data.signedUrl,
      publicUrl: this.supabase.storage.from("provider-avatars").getPublicUrl(path).data.publicUrl
    }
  }
}

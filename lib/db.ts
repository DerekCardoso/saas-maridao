import { createSupabaseBrowserClient, createSupabaseServerClient, type Database } from "./supabase"

const supabase = typeof window === "undefined" ? createSupabaseServerClient() : createSupabaseBrowserClient()

// Tipos para facilitar o uso
type User = Database["public"]["Tables"]["users"]["Row"]
type Provider = Database["public"]["Tables"]["providers"]["Row"]
type Client = Database["public"]["Tables"]["clients"]["Row"]
type Appointment = Database["public"]["Tables"]["appointments"]["Row"]
type Review = Database["public"]["Tables"]["reviews"]["Row"]
type Message = Database["public"]["Tables"]["messages"]["Row"]
type Notification = Database["public"]["Tables"]["notifications"]["Row"]
type Address = Database["public"]["Tables"]["addresses"]["Row"]
type ProviderSpecialty = Database["public"]["Tables"]["provider_specialties"]["Row"]

// Interface para simular o Prisma Client (mantendo compatibilidade)
export const prisma = {
  user: {
    findUnique: async ({ where }: { where: any }) => {
      let query = supabase.from("users").select("*")

      if (where.id) {
        query = query.eq("id", where.id)
      }
      if (where.email) {
        query = query.eq("email", where.email)
      }

      const { data, error } = await query.single()
      if (error && error.code !== "PGRST116") throw error
      return data
    },

    findMany: async ({ where, include, take, skip }: { where?: any; include?: any; take?: number; skip?: number }) => {
      let query = supabase.from("users").select("*")

      if (where) {
        // Implementar filtros conforme necessário
      }

      if (take) {
        query = query.limit(take)
      }

      if (skip) {
        query = query.range(skip, skip + (take || 10) - 1)
      }

      const { data, error } = await query
      if (error) throw error

      // Adicionar relacionamentos se solicitado
      if (include && data) {
        for (const user of data) {
          if (include.client) {
            const { data: client } = await supabase.from("clients").select("*").eq("user_id", user.id).single()
            user.client = client
          }

          if (include.provider) {
            const { data: provider } = await supabase.from("providers").select("*").eq("user_id", user.id).single()
            user.provider = provider

            if (provider && include.provider.include?.specialties) {
              const { data: specialties } = await supabase
                .from("provider_specialties")
                .select("*")
                .eq("provider_id", provider.id)
              provider.specialties = specialties || []
            }
          }

          if (include.addresses) {
            const { data: addresses } = await supabase.from("addresses").select("*").eq("user_id", user.id)
            user.addresses = addresses || []
          }
        }
      }

      return data || []
    },

    create: async ({ data }: { data: any }) => {
      const { data: newUser, error } = await supabase.from("users").insert([data]).select().single()
      if (error) throw error
      return newUser
    },

    update: async ({ where, data }: { where: any; data: any }) => {
      const { data: updatedUser, error } = await supabase
        .from("users")
        .update(data)
        .eq("id", where.id)
        .select()
        .single()
      if (error) throw error
      return updatedUser
    },

    delete: async ({ where }: { where: any }) => {
      const { data: deletedUser, error } = await supabase.from("users").delete().eq("id", where.id).select().single()
      if (error) throw error
      return deletedUser
    },

    count: async ({ where }: { where?: any }) => {
      const query = supabase.from("users").select("*", { count: "exact", head: true })

      if (where) {
        // Implementar filtros conforme necessário
      }

      const { count, error } = await query
      if (error) throw error
      return count || 0
    },
  },

  client: {
    findUnique: async ({ where }: { where: any }) => {
      const { data, error } = await supabase.from("clients").select("*").eq("id", where.id).single()
      if (error && error.code !== "PGRST116") throw error
      return data
    },

    findFirst: async ({ where }: { where: any }) => {
      let query = supabase.from("clients").select("*")

      if (where.user?.id) {
        query = query.eq("user_id", where.user.id)
      }

      const { data, error } = await query.single()
      if (error && error.code !== "PGRST116") throw error
      return data
    },

    findMany: async ({ where, include }: { where?: any; include?: any }) => {
      const query = supabase.from("clients").select("*")

      if (where) {
        // Implementar filtros conforme necessário
      }

      const { data, error } = await query
      if (error) throw error

      // Adicionar relacionamentos se solicitado
      if (include && data) {
        for (const client of data) {
          if (include.user) {
            const { data: user } = await supabase.from("users").select("*").eq("id", client.user_id).single()
            client.user = user
          }
        }
      }

      return data || []
    },

    create: async ({ data }: { data: any }) => {
      const { data: newClient, error } = await supabase.from("clients").insert([data]).select().single()
      if (error) throw error
      return newClient
    },
  },

  provider: {
    findUnique: async ({ where, include }: { where: any; include?: any }) => {
      const { data: provider, error } = await supabase.from("providers").select("*").eq("id", where.id).single()
      if (error && error.code !== "PGRST116") throw error

      if (!provider || !include) {
        return provider
      }

      if (include.user) {
        const { data: user } = await supabase.from("users").select("*").eq("id", provider.user_id).single()
        provider.user = user

        if (user && include.user.select?.addresses) {
          const { data: addresses } = await supabase.from("addresses").select("*").eq("user_id", user.id)
          user.addresses = addresses || []
        }
      }

      if (include.specialties) {
        const { data: specialties } = await supabase
          .from("provider_specialties")
          .select("*")
          .eq("provider_id", provider.id)
        provider.specialties = specialties || []
      }

      if (include.reviews) {
        let query = supabase.from("reviews").select("*").eq("provider_id", provider.id)

        if (include.reviews.take) {
          query = query.limit(include.reviews.take)
        }

        if (include.reviews.orderBy?.createdAt === "desc") {
          query = query.order("created_at", { ascending: false })
        }

        const { data: reviews } = await query
        provider.reviews = reviews || []

        if (include.reviews.select && reviews) {
          for (const review of reviews) {
            if (include.reviews.select.client) {
              const { data: client } = await supabase.from("clients").select("*").eq("id", review.client_id).single()
              if (client && include.reviews.select.client.select?.user) {
                const { data: user } = await supabase.from("users").select("*").eq("id", client.user_id).single()
                review.client = {
                  user: {
                    name: user?.name,
                  },
                }
              }
            }
          }
        }
      }

      if (include._count) {
        const { count } = await supabase
          .from("reviews")
          .select("*", { count: "exact", head: true })
          .eq("provider_id", provider.id)
        provider._count = {
          reviews: count || 0,
        }
      }

      return provider
    },

    findFirst: async ({ where }: { where: any }) => {
      let query = supabase.from("providers").select("*")

      if (where.user?.id) {
        query = query.eq("user_id", where.user.id)
      }

      const { data, error } = await query.single()
      if (error && error.code !== "PGRST116") throw error
      return data
    },

    findMany: async ({
      where,
      include,
      take,
      skip,
      orderBy,
    }: { where?: any; include?: any; take?: number; skip?: number; orderBy?: any }) => {
      let query = supabase.from("providers").select("*")

      if (where) {
        if (where.rating?.gte) {
          query = query.gte("rating", where.rating.gte)
        }

        if (where.is_premium !== undefined) {
          query = query.eq("is_premium", where.is_premium)
        }
      }

      // Ordenação
      if (orderBy) {
        if (Array.isArray(orderBy)) {
          orderBy.forEach((order) => {
            if (order.is_premium === "desc") {
              query = query.order("is_premium", { ascending: false })
            } else if (order.rating === "desc") {
              query = query.order("rating", { ascending: false })
            }
          })
        }
      }

      if (take) {
        query = query.limit(take)
      }

      if (skip) {
        query = query.range(skip, skip + (take || 10) - 1)
      }

      const { data, error } = await query
      if (error) throw error

      // Adicionar relacionamentos se solicitado
      if (include && data) {
        for (const provider of data) {
          if (include.user) {
            const { data: user } = await supabase.from("users").select("*").eq("id", provider.user_id).single()
            provider.user = user

            if (user && include.user.select?.addresses) {
              const { data: addresses } = await supabase.from("addresses").select("*").eq("user_id", user.id)
              user.addresses = addresses || []
            }
          }

          if (include.specialties) {
            const { data: specialties } = await supabase
              .from("provider_specialties")
              .select("*")
              .eq("provider_id", provider.id)
            provider.specialties = specialties || []
          }

          if (include.reviews) {
            let reviewQuery = supabase.from("reviews").select("*").eq("provider_id", provider.id)

            if (include.reviews.take) {
              reviewQuery = reviewQuery.limit(include.reviews.take)
            }

            if (include.reviews.orderBy?.created_at === "desc") {
              reviewQuery = reviewQuery.order("created_at", { ascending: false })
            }

            const { data: reviews } = await reviewQuery
            provider.reviews = reviews || []
          }

          if (include._count) {
            const { count } = await supabase
              .from("reviews")
              .select("*", { count: "exact", head: true })
              .eq("provider_id", provider.id)
            provider._count = {
              reviews: count || 0,
            }
          }
        }
      }

      return data || []
    },

    count: async ({ where }: { where?: any }) => {
      let query = supabase.from("providers").select("*", { count: "exact", head: true })

      if (where) {
        if (where.rating?.gte) {
          query = query.gte("rating", where.rating.gte)
        }

        if (where.is_premium !== undefined) {
          query = query.eq("is_premium", where.is_premium)
        }
      }

      const { count, error } = await query
      if (error) throw error
      return count || 0
    },

    update: async ({ where, data }: { where: any; data: any }) => {
      const { data: updatedProvider, error } = await supabase
        .from("providers")
        .update(data)
        .eq("id", where.id)
        .select()
        .single()
      if (error) throw error
      return updatedProvider
    },
  },

  address: {
    create: async ({ data }: { data: any }) => {
      const { data: newAddress, error } = await supabase.from("addresses").insert([data]).select().single()
      if (error) throw error
      return newAddress
    },

    findFirst: async ({ where }: { where: any }) => {
      let query = supabase.from("addresses").select("*")

      if (where.user_id) {
        query = query.eq("user_id", where.user_id)
      }

      const { data, error } = await query.single()
      if (error && error.code !== "PGRST116") throw error
      return data
    },

    update: async ({ where, data }: { where: any; data: any }) => {
      const { data: updatedAddress, error } = await supabase
        .from("addresses")
        .update(data)
        .eq("id", where.id)
        .select()
        .single()
      if (error) throw error
      return updatedAddress
    },
  },

  providerSpecialty: {
    create: async ({ data }: { data: any }) => {
      const { data: newSpecialty, error } = await supabase.from("provider_specialties").insert([data]).select().single()
      if (error) throw error
      return newSpecialty
    },

    deleteMany: async ({ where }: { where: any }) => {
      const { data, error } = await supabase
        .from("provider_specialties")
        .delete()
        .eq("provider_id", where.provider_id)
        .select()
      if (error) throw error
      return { count: data?.length || 0 }
    },
  },

  appointment: {
    findUnique: async ({ where, include }: { where: any; include?: any }) => {
      const { data, error } = await supabase.from("appointments").select("*").eq("id", where.id).single()
      if (error && error.code !== "PGRST116") throw error
      return data
    },

    findMany: async ({ where, include, orderBy }: { where?: any; include?: any; orderBy?: any }) => {
      let query = supabase.from("appointments").select("*")

      if (where) {
        if (where.client_id) {
          query = query.eq("client_id", where.client_id)
        }

        if (where.provider_id) {
          query = query.eq("provider_id", where.provider_id)
        }

        if (where.status) {
          query = query.eq("status", where.status)
        }

        if (where.date?.gte) {
          query = query.gte("date", where.date.gte.toISOString().split("T")[0])
        }

        if (where.date?.lt) {
          query = query.lt("date", where.date.lt.toISOString().split("T")[0])
        }
      }

      // Ordenação
      if (orderBy) {
        if (orderBy.date === "desc") {
          query = query.order("date", { ascending: false })
        } else if (orderBy.date === "asc") {
          query = query.order("date", { ascending: true })
        }
      }

      const { data, error } = await query
      if (error) throw error
      return data || []
    },

    create: async ({ data }: { data: any }) => {
      const { data: newAppointment, error } = await supabase.from("appointments").insert([data]).select().single()
      if (error) throw error
      return newAppointment
    },

    update: async ({ where, data }: { where: any; data: any }) => {
      const { data: updatedAppointment, error } = await supabase
        .from("appointments")
        .update(data)
        .eq("id", where.id)
        .select()
        .single()
      if (error) throw error
      return updatedAppointment
    },

    delete: async ({ where }: { where: any }) => {
      const { data: deletedAppointment, error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", where.id)
        .select()
        .single()
      if (error) throw error
      return deletedAppointment
    },
  },

  review: {
    findUnique: async ({ where, include }: { where: any; include?: any }) => {
      const { data, error } = await supabase.from("reviews").select("*").eq("id", where.id).single()
      if (error && error.code !== "PGRST116") throw error
      return data
    },

    findMany: async ({ where, include, orderBy }: { where?: any; include?: any; orderBy?: any }) => {
      let query = supabase.from("reviews").select("*")

      if (where) {
        if (where.provider_id) {
          query = query.eq("provider_id", where.provider_id)
        }

        if (where.client_id) {
          query = query.eq("client_id", where.client_id)
        }
      }

      // Ordenação
      if (orderBy) {
        if (orderBy.created_at === "desc") {
          query = query.order("created_at", { ascending: false })
        } else if (orderBy.created_at === "asc") {
          query = query.order("created_at", { ascending: true })
        }
      }

      const { data, error } = await query
      if (error) throw error
      return data || []
    },

    create: async ({ data }: { data: any }) => {
      const { data: newReview, error } = await supabase.from("reviews").insert([data]).select().single()
      if (error) throw error
      return newReview
    },
  },

  message: {
    findMany: async ({ where, include, orderBy }: { where?: any; include?: any; orderBy?: any }) => {
      let query = supabase.from("messages").select("*")

      if (where) {
        if (where.OR) {
          // Implementar lógica OR complexa se necessário
        }

        if (where.AND) {
          // Implementar lógica AND complexa se necessário
        }
      }

      // Ordenação
      if (orderBy) {
        if (orderBy.created_at === "desc") {
          query = query.order("created_at", { ascending: false })
        } else if (orderBy.created_at === "asc") {
          query = query.order("created_at", { ascending: true })
        }
      }

      const { data, error } = await query
      if (error) throw error
      return data || []
    },

    create: async ({ data }: { data: any }) => {
      const { data: newMessage, error } = await supabase.from("messages").insert([data]).select().single()
      if (error) throw error
      return newMessage
    },
  },

  notification: {
    findMany: async ({ where, orderBy, take }: { where?: any; orderBy?: any; take?: number }) => {
      let query = supabase.from("notifications").select("*")

      if (where) {
        if (where.user_id) {
          query = query.eq("user_id", where.user_id)
        }

        if (where.is_read !== undefined) {
          query = query.eq("is_read", where.is_read)
        }

        if (where.type) {
          query = query.eq("type", where.type)
        }
      }

      // Ordenação
      if (orderBy) {
        if (orderBy.created_at === "desc") {
          query = query.order("created_at", { ascending: false })
        } else if (orderBy.created_at === "asc") {
          query = query.order("created_at", { ascending: true })
        }
      }

      if (take) {
        query = query.limit(take)
      }

      const { data, error } = await query
      if (error) throw error
      return data || []
    },

    create: async ({ data }: { data: any }) => {
      const { data: newNotification, error } = await supabase.from("notifications").insert([data]).select().single()
      if (error) throw error
      return newNotification
    },

    update: async ({ where, data }: { where: any; data: any }) => {
      const { data: updatedNotification, error } = await supabase
        .from("notifications")
        .update(data)
        .eq("id", where.id)
        .select()
        .single()
      if (error) throw error
      return updatedNotification
    },

    updateMany: async ({ where, data }: { where: any; data: any }) => {
      const { data: updatedNotifications, error } = await supabase
        .from("notifications")
        .update(data)
        .eq("user_id", where.user_id)
        .select()
      if (error) throw error
      return { count: updatedNotifications?.length || 0 }
    },

    delete: async ({ where }: { where: any }) => {
      const { data: deletedNotification, error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", where.id)
        .select()
        .single()
      if (error) throw error
      return deletedNotification
    },

    count: async ({ where }: { where?: any }) => {
      let query = supabase.from("notifications").select("*", { count: "exact", head: true })

      if (where) {
        if (where.user_id) {
          query = query.eq("user_id", where.user_id)
        }

        if (where.is_read !== undefined) {
          query = query.eq("is_read", where.is_read)
        }
      }

      const { count, error } = await query
      if (error) throw error
      return count || 0
    },
  },

  $disconnect: async () => {
    // Não faz nada, apenas para compatibilidade
  },
}

// Funções específicas do Supabase
export async function createUserWithSupabase(userData: Database["public"]["Tables"]["users"]["Insert"]) {
  const { data, error } = await supabase.from("users").insert([userData]).select().single()
  if (error) throw error
  return data
}

export async function getUserByEmailWithSupabase(email: string) {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single()
  if (error && error.code !== "PGRST116") throw error
  return data
}

export async function getProvidersWithSupabase() {
  const { data, error } = await supabase.from("providers").select(`
      *,
      users (*)
    `)
  if (error) throw error
  return data
}

export async function getAppointmentsWithSupabase() {
  const { data, error } = await supabase.from("appointments").select(`
      *,
      clients!appointments_client_id_fkey (
        *,
        users (*)
      ),
      providers!appointments_provider_id_fkey (
        *,
        users (*)
      )
    `)
  if (error) throw error
  return data
}

export default prisma

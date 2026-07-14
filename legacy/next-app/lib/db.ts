// Este arquivo foi modificado para usar dados mockados em vez de se conectar ao banco de dados
import {
  users,
  providers,
  appointments,
  reviews,
  messages,
  notifications,
  services,
  categories,
  mockData, // Declare mockData here
} from "./mock-data"

// Interface para simular o Prisma Client
export const prisma = {
  user: {
    findUnique: async ({ where }: { where: any }) => {
      if (where.id) {
        return users.find((user) => user.id === where.id) || null
      }
      if (where.email) {
        return users.find((user) => user.email === where.email) || null
      }
      return null
    },
    findMany: async ({ where, include, take, skip }: { where?: any; include?: any; take?: number; skip?: number }) => {
      let filteredUsers = [...users]

      if (where) {
        // Implementar filtros conforme necessário
      }

      if (skip) {
        filteredUsers = filteredUsers.slice(skip)
      }

      if (take) {
        filteredUsers = filteredUsers.slice(0, take)
      }

      // Adicionar relacionamentos se solicitado
      if (include) {
        filteredUsers = filteredUsers.map((user) => {
          const result: any = { ...user }

          if (include.client) {
            result.client = messages.find((message) => message.userId === user.id) || null
          }

          if (include.provider) {
            const provider = providers.find((provider) => provider.userId === user.id) || null

            if (provider && include.provider.include?.specialties) {
              provider.specialties = mockData.providerSpecialties.filter(
                (specialty) => specialty.providerId === provider.id,
              )
            }

            result.provider = provider
          }

          if (include.addresses) {
            result.addresses = mockData.addresses.filter((address) => address.userId === user.id)
          }

          return result
        })
      }

      return filteredUsers
    },
    create: async ({ data }: { data: any }) => {
      const newId = `user-${users.length + 1}`
      const newUser = {
        id: newId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      users.push(newUser)
      return newUser
    },
    update: async ({ where, data }: { where: any; data: any }) => {
      const userIndex = users.findIndex((user) => user.id === where.id)
      if (userIndex === -1) {
        throw new Error("User not found")
      }
      const updatedUser = {
        ...users[userIndex],
        ...data,
        updatedAt: new Date(),
      }
      users[userIndex] = updatedUser
      return updatedUser
    },
    delete: async ({ where }: { where: any }) => {
      const userIndex = users.findIndex((user) => user.id === where.id)
      if (userIndex === -1) {
        throw new Error("User not found")
      }
      const deletedUser = users[userIndex]
      users.splice(userIndex, 1)
      return deletedUser
    },
    count: async ({ where }: { where?: any }) => {
      const count = users.length
      if (where) {
        // Implementar filtros conforme necessário
      }
      return count
    },
  },
  client: {
    findUnique: async ({ where }: { where: any }) => {
      return messages.find((message) => message.id === where.id) || null
    },
    findFirst: async ({ where }: { where: any }) => {
      if (where.user?.id) {
        return (
          messages.find((message) => {
            const user = users.find((u) => u.id === message.userId)
            return user && user.id === where.user.id
          }) || null
        )
      }
      return null
    },
    findMany: async ({ where, include }: { where?: any; include?: any }) => {
      let filteredClients = [...messages]

      if (where) {
        // Implementar filtros conforme necessário
      }

      // Adicionar relacionamentos se solicitado
      if (include) {
        filteredClients = filteredClients.map((client) => {
          const result: any = { ...client }

          if (include.user) {
            const user = users.find((user) => user.id === client.userId) || null
            result.user = user
          }

          return result
        })
      }

      return filteredClients
    },
    create: async ({ data }: { data: any }) => {
      const newId = `client-${messages.length + 1}`
      const newClient = {
        id: newId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      messages.push(newClient)
      return newClient
    },
  },
  provider: {
    findUnique: async ({ where, include }: { where: any; include?: any }) => {
      const provider = providers.find((provider) => provider.id === where.id) || null

      if (!provider || !include) {
        return provider
      }

      const result: any = { ...provider }

      if (include.user) {
        const user = users.find((user) => user.id === provider.userId) || null

        if (user && include.user.select?.addresses) {
          user.addresses = mockData.addresses.filter((address) => address.userId === user.id)
        }

        result.user = user
      }

      if (include.specialties) {
        result.specialties = mockData.providerSpecialties.filter((specialty) => specialty.providerId === provider.id)
      }

      if (include.reviews) {
        let reviews = mockData.reviews.filter((review) => review.providerId === provider.id)

        if (include.reviews.select) {
          reviews = reviews.map((review) => {
            const result: any = {}

            if (include.reviews.select.id) result.id = review.id
            if (include.reviews.select.rating) result.rating = review.rating
            if (include.reviews.select.comment) result.comment = review.comment
            if (include.reviews.select.createdAt) result.createdAt = review.createdAt

            if (include.reviews.select.client) {
              const client = messages.find((client) => client.id === review.clientId)
              if (client && include.reviews.select.client.select?.user) {
                const user = users.find((user) => user.id === client.userId)
                result.client = {
                  user: {
                    name: user?.name,
                  },
                }
              }
            }

            return result
          })
        }

        result.reviews = reviews
      }

      return result
    },
    findFirst: async ({ where }: { where: any }) => {
      if (where.user?.id) {
        return (
          providers.find((provider) => {
            const user = users.find((u) => u.id === provider.userId)
            return user && user.id === where.user.id
          }) || null
        )
      }
      return null
    },
    findMany: async ({
      where,
      include,
      take,
      skip,
      orderBy,
    }: { where?: any; include?: any; take?: number; skip?: number; orderBy?: any }) => {
      let filteredProviders = [...providers]

      if (where) {
        if (where.specialties?.some?.name?.contains) {
          const searchTerm = where.specialties.some.name.contains.toLowerCase()
          filteredProviders = filteredProviders.filter((provider) => {
            const specialties = mockData.providerSpecialties.filter((specialty) => specialty.providerId === provider.id)
            return specialties.some((specialty) => specialty.name.toLowerCase().includes(searchTerm))
          })
        }

        if (where.rating?.gte) {
          filteredProviders = filteredProviders.filter((provider) => provider.rating >= where.rating.gte)
        }

        if (where.isPremium !== undefined) {
          filteredProviders = filteredProviders.filter((provider) => provider.isPremium === where.isPremium)
        }
      }

      // Ordenação
      if (orderBy) {
        if (Array.isArray(orderBy)) {
          orderBy.forEach((order) => {
            if (order.isPremium === "desc") {
              filteredProviders.sort((a, b) => (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0))
            } else if (order.rating === "desc") {
              filteredProviders.sort((a, b) => b.rating - a.rating)
            }
          })
        }
      }

      if (skip) {
        filteredProviders = filteredProviders.slice(skip)
      }

      if (take) {
        filteredProviders = filteredProviders.slice(0, take)
      }

      // Adicionar relacionamentos se solicitado
      if (include) {
        filteredProviders = filteredProviders.map((provider) => {
          const result: any = { ...provider }

          if (include.user) {
            const user = users.find((user) => user.id === provider.userId) || null

            if (user && include.user.select?.addresses) {
              user.addresses = mockData.addresses.filter((address) => address.userId === user.id)
            }

            result.user = user
          }

          if (include.specialties) {
            result.specialties = mockData.providerSpecialties.filter(
              (specialty) => specialty.providerId === provider.id,
            )
          }

          if (include.reviews) {
            let reviews = mockData.reviews.filter((review) => review.providerId === provider.id)

            if (include.reviews.select) {
              reviews = reviews.map((review) => {
                const result: any = {}

                if (include.reviews.select.id) result.id = review.id
                if (include.reviews.select.rating) result.rating = review.rating
                if (include.reviews.select.comment) result.comment = review.comment
                if (include.reviews.select.createdAt) result.createdAt = review.createdAt

                if (include.reviews.select.client) {
                  const client = messages.find((client) => client.id === review.clientId)
                  if (client && include.reviews.select.client.select?.user) {
                    const user = users.find((user) => user.id === client.userId)
                    result.client = {
                      user: {
                        name: user?.name,
                      },
                    }
                  }
                }

                return result
              })
            }

            if (include.reviews.take) {
              reviews = reviews.slice(0, include.reviews.take)
            }

            if (include.reviews.orderBy?.createdAt === "desc") {
              reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            }

            result.reviews = reviews
          }

          if (include._count) {
            result._count = {
              reviews: mockData.reviews.filter((review) => review.providerId === provider.id).length,
            }
          }

          return result
        })
      }

      return filteredProviders
    },
    count: async ({ where }: { where?: any }) => {
      let count = providers.length

      if (where) {
        let filteredProviders = [...providers]

        if (where.specialties?.some?.name?.contains) {
          const searchTerm = where.specialties.some.name.contains.toLowerCase()
          filteredProviders = filteredProviders.filter((provider) => {
            const specialties = mockData.providerSpecialties.filter((specialty) => specialty.providerId === provider.id)
            return specialties.some((specialty) => specialty.name.toLowerCase().includes(searchTerm))
          })
        }

        if (where.rating?.gte) {
          filteredProviders = filteredProviders.filter((provider) => provider.rating >= where.rating.gte)
        }

        if (where.isPremium !== undefined) {
          filteredProviders = filteredProviders.filter((provider) => provider.isPremium === where.isPremium)
        }

        count = filteredProviders.length
      }

      return count
    },
    update: async ({ where, data }: { where: any; data: any }) => {
      const providerIndex = providers.findIndex((provider) => provider.id === where.id)
      if (providerIndex === -1) {
        throw new Error("Provider not found")
      }
      const updatedProvider = {
        ...providers[providerIndex],
        ...data,
        updatedAt: new Date(),
      }
      providers[providerIndex] = updatedProvider
      return updatedProvider
    },
  },
  address: {
    create: async ({ data }: { data: any }) => {
      const newId = `address-${mockData.addresses.length + 1}`
      const newAddress = {
        id: newId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockData.addresses.push(newAddress)
      return newAddress
    },
    findFirst: async ({ where }: { where: any }) => {
      if (where.userId) {
        return mockData.addresses.find((address) => address.userId === where.userId) || null
      }
      return null
    },
    update: async ({ where, data }: { where: any; data: any }) => {
      const addressIndex = mockData.addresses.findIndex((address) => address.id === where.id)
      if (addressIndex === -1) {
        throw new Error("Address not found")
      }
      const updatedAddress = {
        ...mockData.addresses[addressIndex],
        ...data,
        updatedAt: new Date(),
      }
      mockData.addresses[addressIndex] = updatedAddress
      return updatedAddress
    },
  },
  providerSpecialty: {
    create: async ({ data }: { data: any }) => {
      const newId = `specialty-${mockData.providerSpecialties.length + 1}`
      const newSpecialty = {
        id: newId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockData.providerSpecialties.push(newSpecialty)
      return newSpecialty
    },
    deleteMany: async ({ where }: { where: any }) => {
      if (where.providerId) {
        const initialLength = mockData.providerSpecialties.length
        mockData.providerSpecialties = mockData.providerSpecialties.filter(
          (specialty) => specialty.providerId !== where.providerId,
        )
        return { count: initialLength - mockData.providerSpecialties.length }
      }
      return { count: 0 }
    },
  },
  appointment: {
    findUnique: async ({ where, include }: { where: any; include?: any }) => {
      const appointment = appointments.find((appointment) => appointment.id === where.id) || null

      if (!appointment || !include) {
        return appointment
      }

      return appointment
    },
    findMany: async ({ where, include, orderBy }: { where?: any; include?: any; orderBy?: any }) => {
      let filteredAppointments = [...appointments]

      if (where) {
        if (where.clientId) {
          filteredAppointments = filteredAppointments.filter((appointment) => appointment.clientId === where.clientId)
        }

        if (where.providerId) {
          filteredAppointments = filteredAppointments.filter(
            (appointment) => appointment.providerId === where.providerId,
          )
        }

        if (where.status) {
          filteredAppointments = filteredAppointments.filter((appointment) => appointment.status === where.status)
        }

        if (where.date?.gte) {
          filteredAppointments = filteredAppointments.filter(
            (appointment) => appointment.date.getTime() >= where.date.gte.getTime(),
          )
        }

        if (where.date?.lt) {
          filteredAppointments = filteredAppointments.filter(
            (appointment) => appointment.date.getTime() < where.date.lt.getTime(),
          )
        }
      }

      // Ordenação
      if (orderBy) {
        if (orderBy.date === "desc") {
          filteredAppointments.sort((a, b) => b.date.getTime() - a.date.getTime())
        } else if (orderBy.date === "asc") {
          filteredAppointments.sort((a, b) => a.date.getTime() - b.date.getTime())
        }
      }

      return filteredAppointments
    },
    create: async ({ data }: { data: any }) => {
      const newId = `appointment-${appointments.length + 1}`
      const newAppointment = {
        id: newId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        client: {
          id: data.clientId,
          userId: messages.find((message) => message.id === data.clientId)?.userId,
          user: {
            name: users.find((user) => user.id === messages.find((message) => message.id === data.clientId)?.userId)
              ?.name,
            phone: users.find((user) => user.id === messages.find((message) => message.id === data.clientId)?.userId)
              ?.phone,
          },
        },
        provider: {
          id: data.providerId,
          userId: providers.find((provider) => provider.id === data.providerId)?.userId,
          user: {
            name: users.find(
              (user) => user.id === providers.find((provider) => provider.id === data.providerId)?.userId,
            )?.name,
            phone: users.find(
              (user) => user.id === providers.find((provider) => provider.id === data.providerId)?.userId,
            )?.phone,
          },
        },
        review: null,
      }
      appointments.push(newAppointment)
      return newAppointment
    },
    update: async ({ where, data }: { where: any; data: any }) => {
      const appointmentIndex = appointments.findIndex((appointment) => appointment.id === where.id)
      if (appointmentIndex === -1) {
        throw new Error("Appointment not found")
      }
      const updatedAppointment = {
        ...appointments[appointmentIndex],
        ...data,
        updatedAt: new Date(),
      }
      appointments[appointmentIndex] = updatedAppointment
      return updatedAppointment
    },
    delete: async ({ where }: { where: any }) => {
      const appointmentIndex = appointments.findIndex((appointment) => appointment.id === where.id)
      if (appointmentIndex === -1) {
        throw new Error("Appointment not found")
      }
      const deletedAppointment = appointments[appointmentIndex]
      appointments.splice(appointmentIndex, 1)
      return deletedAppointment
    },
  },
  review: {
    findUnique: async ({ where, include }: { where: any; include?: any }) => {
      const review = reviews.find((review) => review.id === where.id) || null

      if (!review || !include) {
        return review
      }

      return review
    },
    findMany: async ({ where, include, orderBy }: { where?: any; include?: any; orderBy?: any }) => {
      let filteredReviews = [...reviews]

      if (where) {
        if (where.providerId) {
          filteredReviews = filteredReviews.filter((review) => review.providerId === where.providerId)
        }

        if (where.clientId) {
          filteredReviews = filteredReviews.filter((review) => review.clientId === where.clientId)
        }
      }

      // Ordenação
      if (orderBy) {
        if (orderBy.createdAt === "desc") {
          filteredReviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        } else if (orderBy.createdAt === "asc") {
          filteredReviews.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        }
      }

      return filteredReviews
    },
    create: async ({ data }: { data: any }) => {
      const newId = `review-${reviews.length + 1}`
      const newReview = {
        id: newId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        client: {
          id: data.clientId,
          user: {
            name: users.find((user) => user.id === messages.find((message) => message.id === data.clientId)?.userId)
              ?.name,
          },
        },
        appointment: {
          service: appointments.find((appointment) => appointment.id === data.appointmentId)?.service,
        },
      }
      reviews.push(newReview)

      // Atualizar o appointment para incluir a review
      const appointmentIndex = appointments.findIndex((appointment) => appointment.id === data.appointmentId)
      if (appointmentIndex !== -1) {
        appointments[appointmentIndex].review = {
          id: newId,
          rating: data.rating,
          comment: data.comment,
        }
      }

      return newReview
    },
  },
  message: {
    findMany: async ({ where, include, orderBy }: { where?: any; include?: any; orderBy?: any }) => {
      let filteredMessages = [...messages]

      if (where) {
        if (where.OR) {
          if (Array.isArray(where.OR)) {
            filteredMessages = filteredMessages.filter((message) => {
              return where.OR.some((condition: any) => {
                if (condition.senderId && condition.receiverId) {
                  return message.senderId === condition.senderId && message.receiverId === condition.receiverId
                }
                if (condition.OR) {
                  return (
                    (message.senderId === condition.OR[0].senderId &&
                      message.receiverId === condition.OR[0].receiverId) ||
                    (message.senderId === condition.OR[1].senderId && message.receiverId === condition.OR[1].receiverId)
                  )
                }
                return false
              })
            })
          } else {
            filteredMessages = filteredMessages.filter(
              (message) => message.senderId === where.OR[0].senderId || message.receiverId === where.OR[0].receiverId,
            )
          }
        }

        if (where.AND) {
          filteredMessages = filteredMessages.filter((message) => {
            return where.AND.every((condition: any) => {
              if (condition.receiverId) {
                return message.receiverId === condition.receiverId
              }
              if (condition.isRead !== undefined) {
                return message.isRead === condition.isRead
              }
              return true
            })
          })
        }
      }

      // Ordenação
      if (orderBy) {
        if (orderBy.createdAt === "desc") {
          filteredMessages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        } else if (orderBy.createdAt === "asc") {
          filteredMessages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        }
      }

      return filteredMessages
    },
    create: async ({ data }: { data: any }) => {
      const newId = `message-${messages.length + 1}`
      const newMessage = {
        id: newId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        sender: {
          id: data.senderId,
          name: users.find((user) => user.id === data.senderId)?.name,
        },
        receiver: {
          id: data.receiverId,
          name: users.find((user) => user.id === data.receiverId)?.name,
        },
      }
      messages.push(newMessage)
      return newMessage
    },
  },
  notification: {
    findMany: async ({ where, orderBy, take }: { where?: any; orderBy?: any; take?: number }) => {
      let filteredNotifications = [...notifications]

      if (where) {
        if (where.userId) {
          filteredNotifications = filteredNotifications.filter((notification) => notification.userId === where.userId)
        }

        if (where.isRead !== undefined) {
          filteredNotifications = filteredNotifications.filter((notification) => notification.isRead === where.isRead)
        }

        if (where.type) {
          filteredNotifications = filteredNotifications.filter((notification) => notification.type === where.type)
        }
      }

      // Ordenação
      if (orderBy) {
        if (orderBy.createdAt === "desc") {
          filteredNotifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        } else if (orderBy.createdAt === "asc") {
          filteredNotifications.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        }
      }

      if (take) {
        filteredNotifications = filteredNotifications.slice(0, take)
      }

      return filteredNotifications
    },
    create: async ({ data }: { data: any }) => {
      const newId = `notification-${notifications.length + 1}`
      const newNotification = {
        id: newId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      notifications.push(newNotification)
      return newNotification
    },
    update: async ({ where, data }: { where: any; data: any }) => {
      const notificationIndex = notifications.findIndex((notification) => notification.id === where.id)
      if (notificationIndex === -1) {
        throw new Error("Notification not found")
      }
      const updatedNotification = {
        ...notifications[notificationIndex],
        ...data,
        updatedAt: new Date(),
      }
      notifications[notificationIndex] = updatedNotification
      return updatedNotification
    },
    updateMany: async ({ where, data }: { where: any; data: any }) => {
      let count = 0

      if (where.userId) {
        notifications.forEach((notification, index) => {
          if (notification.userId === where.userId) {
            notifications[index] = {
              ...notification,
              ...data,
              updatedAt: new Date(),
            }
            count++
          }
        })
      }

      return { count }
    },
    delete: async ({ where }: { where: any }) => {
      const notificationIndex = notifications.findIndex((notification) => notification.id === where.id)
      if (notificationIndex === -1) {
        throw new Error("Notification not found")
      }
      const deletedNotification = notifications[notificationIndex]
      notifications.splice(notificationIndex, 1)
      return deletedNotification
    },
    count: async ({ where }: { where?: any }) => {
      let count = notifications.length

      if (where) {
        let filteredNotifications = [...notifications]

        if (where.userId) {
          filteredNotifications = filteredNotifications.filter((notification) => notification.userId === where.userId)
        }

        if (where.isRead !== undefined) {
          filteredNotifications = filteredNotifications.filter((notification) => notification.isRead === where.isRead)
        }

        count = filteredNotifications.length
      }

      return count
    },
  },
  $disconnect: async () => {
    // Não faz nada, apenas para compatibilidade
  },
}

// Funções de usuários
export async function getUsers() {
  return users
}

export async function getUserById(id: string) {
  return users.find((user) => user.id === id) || null
}

export async function getUserByEmail(email: string) {
  return users.find((user) => user.email === email) || null
}

// Funções de prestadores
export async function getProviders() {
  return providers
}

export async function getProviderById(id: string) {
  return providers.find((provider) => provider.id === id) || null
}

export async function getProvidersByCategory(categoryId: string) {
  return providers.filter((provider) => provider.categoryIds.includes(categoryId))
}

// Funções de agendamentos
export async function getAppointments() {
  return appointments
}

export async function getAppointmentById(id: string) {
  return appointments.find((appointment) => appointment.id === id) || null
}

export async function getAppointmentsByClientId(clientId: string) {
  return appointments.filter((appointment) => appointment.clientId === clientId)
}

export async function getAppointmentsByProviderId(providerId: string) {
  return appointments.filter((appointment) => appointment.providerId === providerId)
}

// Funções de avaliações
export async function getReviews() {
  return reviews
}

export async function getReviewById(id: string) {
  return reviews.find((review) => review.id === id) || null
}

export async function getReviewsByProviderId(providerId: string) {
  return reviews.filter((review) => review.providerId === providerId)
}

// Funções de mensagens
export async function getMessages() {
  return messages
}

export async function getMessageById(id: string) {
  return messages.find((message) => message.id === id) || null
}

export async function getMessagesByConversation(clientId: string, providerId: string) {
  return messages.filter(
    (message) =>
      (message.senderId === clientId && message.receiverId === providerId) ||
      (message.senderId === providerId && message.receiverId === clientId),
  )
}

export async function getConversationsByUserId(userId: string) {
  const userConversations = messages.filter((message) => message.senderId === userId || message.receiverId === userId)

  const conversationPartners = new Set<string>()
  userConversations.forEach((message) => {
    if (message.senderId === userId) {
      conversationPartners.add(message.receiverId)
    } else {
      conversationPartners.add(message.senderId)
    }
  })

  return Array.from(conversationPartners)
}

// Funções de notificações
export async function getNotifications() {
  return notifications
}

export async function getNotificationById(id: string) {
  return notifications.find((notification) => notification.id === id) || null
}

export async function getNotificationsByUserId(userId: string) {
  return notifications.filter((notification) => notification.userId === userId)
}

// Funções de serviços e categorias
export async function getServices() {
  return services
}

export async function getCategories() {
  return categories
}

export default prisma

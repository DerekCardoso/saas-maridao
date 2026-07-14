import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Bell } from "lucide-react"
import { apiFetch } from "../../lib/api"
import { EmptyState, LoadingState } from "../../components/ui/state"

type Notification = {
  id: string
  title: string
  body: string
  read_at: string | null
  created_at: string
}

export function NotificationsPage() {
  const queryClient = useQueryClient()
  const notifications = useQuery({
    queryKey: ["notifications"],
    queryFn: () => apiFetch<Notification[]>("/notifications")
  })
  const markRead = useMutation({
    mutationFn: (id: string) => apiFetch(`/notifications/${id}/read`, { method: "PATCH" }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["notifications"] })
  })

  if (notifications.isLoading) return <LoadingState />

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-black">Notificações</h1>
      <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200 bg-white">
        {notifications.data?.length === 0 ? <EmptyState title="Sem notificações" description="Novidades importantes aparecerão aqui." /> : null}
        {notifications.data?.map((notification) => (
          <button
            key={notification.id}
            type="button"
            onClick={() => markRead.mutate(notification.id)}
            className={`flex w-full gap-4 p-5 text-left ${notification.read_at ? "bg-white" : "bg-brand-50"}`}
          >
            <Bell className="mt-1 size-5 text-brand-600" />
            <span>
              <strong>{notification.title}</strong>
              <span className="mt-1 block text-sm text-slate-600">{notification.body}</span>
            </span>
          </button>
        ))}
      </div>
    </main>
  )
}

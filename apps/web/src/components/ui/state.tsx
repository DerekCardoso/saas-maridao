import { LoaderCircle, SearchX, TriangleAlert } from "lucide-react"

export function LoadingState({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-slate-600">
      <LoaderCircle className="size-5 animate-spin" />
      {label}
    </div>
  )
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="grid min-h-48 place-items-center border-y border-slate-200 py-10 text-center">
      <div>
        <SearchX className="mx-auto mb-3 size-7 text-slate-400" />
        <h2 className="font-semibold text-ink">{title}</h2>
        <p className="mt-1 max-w-md text-sm text-slate-500">{description}</p>
      </div>
    </div>
  )
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-red-700">
      <TriangleAlert className="size-5" />
      {message}
    </div>
  )
}

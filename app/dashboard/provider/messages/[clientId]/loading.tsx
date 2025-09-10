import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProviderChatLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header skeleton */}
      <Card className="rounded-b-none border-b-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages skeleton */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
            <Skeleton className={`h-12 ${i % 2 === 0 ? "w-64" : "w-48"} rounded-lg`} />
          </div>
        ))}
      </div>

      {/* Input skeleton */}
      <Card className="rounded-t-none border-t-0">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-20" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

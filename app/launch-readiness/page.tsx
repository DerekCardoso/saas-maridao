"use client"

import { useEffect, useMemo, useState } from "react"
import { launchTasks, type LaunchTask, type TaskStatus } from "@/data/launch-tasks"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, CircleAlert, CircleSlash2, Loader2, RefreshCw, Search, Share2 } from "lucide-react"

type PersistedState = Record<string, TaskStatus>
const STORAGE_KEY = "launch-readiness-v1"

const statusOrder: TaskStatus[] = ["pending", "in-progress", "blocked", "done"]

function statusIcon(status: TaskStatus) {
  switch (status) {
    case "done":
      return <CheckCircle2 className="h-4 w-4 text-green-600" />
    case "in-progress":
      return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
    case "blocked":
      return <CircleSlash2 className="h-4 w-4 text-red-600" />
    default:
      return <CircleAlert className="h-4 w-4 text-amber-600" />
  }
}

export default function LaunchReadinessPage() {
  const [persisted, setPersisted] = useState<PersistedState>({})
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | LaunchTask["category"]>("all")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        try {
          setPersisted(JSON.parse(raw))
        } catch {
          // ignore
        }
      }
    }
  }, [])

  const mergedTasks = useMemo<LaunchTask[]>(() => {
    return launchTasks.map((t) => (persisted[t.id] ? { ...t, status: persisted[t.id] } : t))
  }, [persisted])

  const categories = useMemo(() => {
    const set = new Set(launchTasks.map((t) => t.category))
    return Array.from(set)
  }, [])

  const filtered = useMemo(() => {
    let list = mergedTasks
    if (activeTab !== "all") {
      list = list.filter((t) => t.category === activeTab)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((t) => t.title.toLowerCase().includes(q) || (t.description || "").toLowerCase().includes(q))
    }
    return list.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status))
  }, [mergedTasks, activeTab, query])

  const progressAll = useMemo(() => {
    const total = mergedTasks.length
    const done = mergedTasks.filter((t) => t.status === "done").length
    return Math.round((done / total) * 100)
  }, [mergedTasks])

  const progressByCategory = useMemo(() => {
    const map = new Map<string, { total: number; done: number }>()
    mergedTasks.forEach((t) => {
      const prev = map.get(t.category) || { total: 0, done: 0 }
      prev.total += 1
      if (t.status === "done") prev.done += 1
      map.set(t.category, prev)
    })
    return map
  }, [mergedTasks])

  function setTaskStatus(id: string, status: TaskStatus) {
    const next = { ...persisted, [id]: status }
    setPersisted(next)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }
  }

  function bulkSet(ids: string[], status: TaskStatus) {
    const next = { ...persisted }
    ids.forEach((id) => {
      next[id] = status
    })
    setPersisted(next)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }
  }

  function resetAll() {
    setPersisted({})
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  function exportAsMarkdown() {
    const groups = categories.map((cat) => {
      const catTasks = mergedTasks.filter((t) => t.category === cat)
      const lines = catTasks
        .map((t) => `- [${t.status === "done" ? "x" : " "}] ${t.title} ${t.description ? `— ${t.description}` : ""}`)
        .join("\n")
      const done = catTasks.filter((t) => t.status === "done").length
      const total = catTasks.length
      return `### ${cat} (${done}/${total})\n${lines}`
    })
    const md = `# Maridão — Launch Readiness\n\nProgresso geral: ${progressAll}%\n\n${groups.join("\n\n")}\n`
    navigator.clipboard.writeText(md)
  }

  function exportAsJSON() {
    const payload = mergedTasks.map((t) => ({ id: t.id, status: t.status }))
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
  }

  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Launch Readiness</h1>
          <p className="text-muted-foreground">Acompanhe o que falta para lançar a plataforma 100% funcional.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportAsMarkdown}>
            <Share2 className="mr-2 h-4 w-4" />
            Copiar Checklist (Markdown)
          </Button>
          <Button variant="outline" onClick={exportAsJSON}>
            <Share2 className="mr-2 h-4 w-4" />
            Copiar Status (JSON)
          </Button>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Progresso Geral</CardTitle>
          <CardDescription>Visão macro das tarefas prioritárias para o lançamento.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress value={progressAll} className="h-3" />
            <span className="w-16 text-right text-sm font-medium">{progressAll}%</span>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {Array.from(progressByCategory.entries()).map(([cat, val]) => {
          const pct = Math.round((val.done / val.total) * 100)
          return (
            <Card key={cat}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{cat}</CardTitle>
                  <Badge variant={pct === 100 ? "default" : "secondary"}>
                    {val.done}/{val.total}
                  </Badge>
                </div>
                <CardDescription>{pct}% concluído</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={pct} className="h-2" />
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle>Tarefas</CardTitle>
          <CardDescription>Filtre por categoria e procure por título/descrição.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full overflow-auto">
              <TabsList className="w-full overflow-x-auto">
                <TabsTrigger value="all">Tudo</TabsTrigger>
                {categories.map((c) => (
                  <TabsTrigger key={c} value={c}>
                    {c}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value={activeTab} className="mt-4" />
            </Tabs>
            <div className="flex items-center gap-2 md:w-80">
              <Label htmlFor="search" className="sr-only">
                Buscar
              </Label>
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Buscar tarefas..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="ghost" onClick={resetAll} title="Resetar progresso">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="grid gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/30 md:grid-cols-[24px_1fr_auto]"
              >
                <div className="flex h-6 items-center">
                  <Checkbox
                    checked={t.status === "done"}
                    onCheckedChange={(checked) => setTaskStatus(t.id, checked ? "done" : "pending")}
                    aria-label={`Marcar ${t.title} como concluída`}
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{t.title}</span>
                    <Badge variant="outline">{t.category}</Badge>
                    <Badge
                      variant={
                        t.severity === "high" ? "destructive" : t.severity === "medium" ? "secondary" : "outline"
                      }
                    >
                      {t.severity}
                    </Badge>
                  </div>
                  {t.description ? <p className="mt-1 text-sm text-muted-foreground">{t.description}</p> : null}
                  {t.links && t.links.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {t.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          className="text-xs text-primary underline-offset-2 hover:underline"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="flex items-start justify-end gap-2">
                  <div className="flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs">
                    {statusIcon(t.status)}
                    <span className="capitalize">{t.status.replace("-", " ")}</span>
                  </div>
                  <select
                    className="rounded-md border bg-background px-2 py-1 text-xs"
                    value={t.status}
                    onChange={(e) => setTaskStatus(t.id, e.target.value as TaskStatus)}
                    aria-label={`Alterar status de ${t.title}`}
                  >
                    {statusOrder.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            {filtered.length === 0 ? (
              <Alert>
                <AlertTitle>Nenhuma tarefa encontrada</AlertTitle>
                <AlertDescription>Ajuste os filtros ou a busca para ver resultados.</AlertDescription>
              </Alert>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

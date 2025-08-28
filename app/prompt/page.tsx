"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  masterPromptPt,
  metaDescriptionPt,
  heroHeadlinePt,
  heroSubheadlinePt,
  elevatorPitchPt,
  socialBioPt,
} from "@/content/prompts"
import { Check, Copy } from "lucide-react"

function CopyBlock({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-medium">{label}</CardTitle>
        <Button size="sm" variant="outline" onClick={onCopy}>
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </CardHeader>
      <CardContent>
        <Textarea value={value} readOnly className="min-h-[160px] font-mono text-sm" />
      </CardContent>
    </Card>
  )
}

export default function PromptsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Prompts e Cópias — Maridão</h1>
      <p className="text-muted-foreground mb-6">Cole e use os prompts abaixo para gerar ou ajustar textos do site.</p>

      <Tabs defaultValue="master" className="w-full">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="master">Master Prompt</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="meta">Meta Description</TabsTrigger>
          <TabsTrigger value="elevator">Elevator Pitch</TabsTrigger>
          <TabsTrigger value="social">Social Bio</TabsTrigger>
        </TabsList>

        <TabsContent value="master" className="mt-4">
          <CopyBlock label="Master Prompt (PT-BR)" value={masterPromptPt} />
        </TabsContent>

        <TabsContent value="hero" className="mt-4">
          <div className="grid gap-4">
            <CopyBlock label="Headline" value={heroHeadlinePt} />
            <CopyBlock label="Subheadline" value={heroSubheadlinePt} />
          </div>
        </TabsContent>

        <TabsContent value="meta" className="mt-4">
          <CopyBlock label="Meta Description (≤ 155 caracteres)" value={metaDescriptionPt} />
        </TabsContent>

        <TabsContent value="elevator" className="mt-4">
          <CopyBlock label="Elevator Pitch" value={elevatorPitchPt} />
        </TabsContent>

        <TabsContent value="social" className="mt-4">
          <CopyBlock label="Bio curta para redes sociais" value={socialBioPt} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

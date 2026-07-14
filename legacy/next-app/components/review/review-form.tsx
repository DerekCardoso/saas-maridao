"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { useToastContext } from "@/contexts/toast-context"

interface ReviewFormProps {
  appointmentId: string
  providerId: string
  providerName: string
  service: string
  onReviewSubmitted?: () => void
}

export function ReviewForm({ appointmentId, providerId, providerName, service, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToastContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast.warning({
        title: "Avaliação necessária",
        description: "Por favor, selecione uma classificação de 1 a 5 estrelas.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Em uma implementação real, você enviaria os dados para o servidor
      // Simulando um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulando sucesso
      toast.success({
        title: "Avaliação enviada",
        description: "Obrigado por avaliar o serviço!",
      })

      if (onReviewSubmitted) {
        onReviewSubmitted()
      }
    } catch (error) {
      toast.error({
        title: "Erro ao enviar avaliação",
        description: "Ocorreu um erro ao enviar sua avaliação. Tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Avaliar {providerName}</h3>
        <p className="text-sm text-muted-foreground mb-4">Serviço: {service}</p>
      </div>

      <div className="space-y-2">
        <p className="font-medium">Sua avaliação</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 ${
                  (hoverRating || rating) >= star ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="font-medium">
          Comentário (opcional)
        </label>
        <Textarea
          id="comment"
          placeholder="Conte-nos sobre sua experiência com este profissional..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
      </Button>
    </form>
  )
}

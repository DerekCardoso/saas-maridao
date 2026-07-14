"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useToastContext } from "@/contexts/toast-context"

type ValidationRules = {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  isEmail?: boolean
  isPassword?: boolean
  isPhone?: boolean
  isCep?: boolean
  isEqual?: string
  custom?: (value: string) => boolean | string
}

type ValidationErrors = {
  [key: string]: string
}

type FormValues = {
  [key: string]: string
}

export function useFormValidation(initialValues: FormValues = {}) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const toast = useToastContext()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setValues((prev) => ({ ...prev, [name]: value }))

      // Marcar campo como tocado
      if (!touched[name]) {
        setTouched((prev) => ({ ...prev, [name]: true }))
      }
    },
    [touched],
  )

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }, [])

  const validateField = useCallback(
    (name: string, value: string, rules: ValidationRules): string => {
      if (rules.required && !value) {
        return "Este campo é obrigatório"
      }

      if (rules.minLength && value.length < rules.minLength) {
        return `Este campo deve ter pelo menos ${rules.minLength} caracteres`
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return `Este campo deve ter no máximo ${rules.maxLength} caracteres`
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return "Formato inválido"
      }

      if (rules.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Email inválido"
      }

      if (rules.isPassword && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
        return "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número"
      }

      if (rules.isPhone && !/^$$\d{2}$$ \d{5}-\d{4}$/.test(value)) {
        return "Telefone inválido. Use o formato (00) 00000-0000"
      }

      if (rules.isCep && !/^\d{5}-\d{3}$/.test(value)) {
        return "CEP inválido. Use o formato 00000-000"
      }

      if (rules.isEqual && value !== values[rules.isEqual]) {
        return "Os valores não coincidem"
      }

      if (rules.custom) {
        const result = rules.custom(value)
        if (typeof result === "string") {
          return result
        }
        if (result === false) {
          return "Valor inválido"
        }
      }

      return ""
    },
    [values],
  )

  const validate = useCallback(
    (validationRules: { [key: string]: ValidationRules }) => {
      const newErrors: ValidationErrors = {}
      let isValid = true

      Object.keys(validationRules).forEach((key) => {
        const error = validateField(key, values[key] || "", validationRules[key])
        if (error) {
          newErrors[key] = error
          isValid = false
        }
      })

      setErrors(newErrors)
      return isValid
    },
    [validateField, values],
  )

  const handleSubmit = useCallback(
    (validationRules: { [key: string]: ValidationRules }, onSubmit: (values: FormValues) => void | Promise<void>) => {
      return async (e: React.FormEvent) => {
        e.preventDefault()

        // Marcar todos os campos como tocados
        const allTouched = Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
        setTouched(allTouched)

        const isValid = validate(validationRules)

        if (!isValid) {
          // Mostrar toast com erro de validação
          toast.error({
            title: "Erro de validação",
            description: "Por favor, corrija os erros no formulário antes de continuar.",
          })
          return
        }

        try {
          await onSubmit(values)
        } catch (error) {
          console.error("Erro ao enviar formulário:", error)
          toast.error({
            title: "Erro ao enviar formulário",
            description: error instanceof Error ? error.message : "Ocorreu um erro ao processar sua solicitação.",
          })
        }
      }
    },
    [validate, values, toast],
  )

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    handleSubmit,
    resetForm,
    setValues,
  }
}

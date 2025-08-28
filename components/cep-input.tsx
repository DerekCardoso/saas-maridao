"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input, type InputProps } from "@/components/ui/input"
import { formatCep, validateCep } from "@/lib/viacep"

interface CepInputProps extends Omit<InputProps, "onChange"> {
  onChange?: (value: string, isValid: boolean) => void
  onBlur?: (value: string, isValid: boolean) => void
}

export function CepInput({ onChange, onBlur, value, ...props }: CepInputProps) {
  const [cep, setCep] = useState((value as string) || "")
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (typeof value === "string") {
      setCep(formatCep(value))
      setIsValid(validateCep(value))
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = formatCep(e.target.value)
    setCep(newValue)

    const valid = validateCep(newValue)
    setIsValid(valid)

    if (onChange) {
      onChange(newValue, valid)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(cep, isValid)
    }
  }

  return (
    <Input
      {...props}
      value={cep}
      onChange={handleChange}
      onBlur={handleBlur}
      maxLength={9}
      className={`${props.className || ""} ${!isValid && cep.length > 0 ? "border-red-500" : ""}`}
    />
  )
}

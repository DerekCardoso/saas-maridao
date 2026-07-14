export function formString(form: FormData, key: string): string {
  const value = form.get(key)
  return typeof value === "string" ? value : ""
}

export function formStringArray(form: FormData, key: string): string[] {
  return form.getAll(key).filter((value): value is string => typeof value === "string")
}

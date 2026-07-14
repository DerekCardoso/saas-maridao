const onlyDigits = (value: string) => value.replace(/\D/g, "")

export interface WhatsAppLinkInput {
  phone: string
  clientName: string
  serviceName: string
  scheduledFor?: string
}

export const buildWhatsAppUrl = ({
  phone,
  clientName,
  serviceName,
  scheduledFor
}: WhatsAppLinkInput) => {
  const localPhone = onlyDigits(phone)
  const normalizedPhone = localPhone.startsWith("55") ? localPhone : `55${localPhone}`
  const schedule = scheduledFor ? ` para ${scheduledFor}` : ""
  const message = `Ola, sou ${clientName}. Encontrei seu perfil no Maridao e gostaria de falar sobre ${serviceName}${schedule}.`

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
}

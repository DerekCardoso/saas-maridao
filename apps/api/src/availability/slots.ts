interface BlockedInterval {
  startsAt: string
  endsAt: string
}

interface GenerateSlotsInput {
  date: string
  timeZone: string
  startTime: string
  endTime: string
  blocked: BlockedInterval[]
}

const getTimeZoneOffsetMs = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date)

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  )
  return asUtc - date.getTime()
}

const localDateTimeToUtc = (date: string, time: string, timeZone: string) => {
  const initial = new Date(`${date}T${time}:00.000Z`)
  const firstPass = new Date(initial.getTime() - getTimeZoneOffsetMs(initial, timeZone))
  return new Date(firstPass.getTime() - getTimeZoneOffsetMs(firstPass, timeZone) + getTimeZoneOffsetMs(initial, timeZone))
}

export const generateHourlySlots = ({
  date,
  timeZone,
  startTime,
  endTime,
  blocked
}: GenerateSlotsInput) => {
  const startsAt = localDateTimeToUtc(date, startTime, timeZone)
  const endsAt = localDateTimeToUtc(date, endTime, timeZone)
  const slots: string[] = []

  for (
    let cursor = startsAt.getTime();
    cursor + 60 * 60 * 1000 <= endsAt.getTime();
    cursor += 60 * 60 * 1000
  ) {
    const slotEnd = cursor + 60 * 60 * 1000
    const isBlocked = blocked.some((interval) => {
      const blockStart = new Date(interval.startsAt).getTime()
      const blockEnd = new Date(interval.endsAt).getTime()
      return cursor < blockEnd && slotEnd > blockStart
    })

    if (!isBlocked) slots.push(new Date(cursor).toISOString())
  }

  return slots
}

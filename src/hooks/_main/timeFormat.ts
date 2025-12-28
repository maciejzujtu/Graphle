import { GRAPHLE_START } from "../definitions"

/**
 * Returns the number of days passed since a specific date.
 * @param dateStr - Date string in "DD-MM-YYYY" format
 */
export function getDaysPassed(dateStr: string = GRAPHLE_START): number {
  const [day, month, year] = dateStr.split('-').map(Number)
  const pastDate = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffInMs = today.getTime() - pastDate.getTime()
  const daysPassed = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  return daysPassed
}

export function formatUnixToDate(timestamp: number): string {
    const date = new Date(timestamp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}
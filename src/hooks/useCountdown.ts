// useCountdown.ts — live countdown to a target Date, updates every second
// Usage: const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE)
// Returns zeros when the date has passed. Cleans up interval on unmount.
import { useState, useEffect } from 'react'

export interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculate(target: Date): CountdownValues {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

export function useCountdown(target: Date): CountdownValues {
  const [values, setValues] = useState<CountdownValues>(() => calculate(target))
  useEffect(() => {
    const id = setInterval(() => setValues(calculate(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return values
}

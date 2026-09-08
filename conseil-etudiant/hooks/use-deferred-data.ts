"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"

export function useDeferredData<T>(
  fetchFunction: () => Promise<T>,
  initialData: T,
  options = { threshold: 0.1, triggerOnce: true },
) {
  const [data, setData] = useState<T>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [ref, inView] = useInView(options)

  useEffect(() => {
    if (inView && !isLoading) {
      setIsLoading(true)

      fetchFunction()
        .then((result) => {
          setData(result)
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err)
          setIsLoading(false)
        })
    }
  }, [inView, fetchFunction, isLoading])

  return { data, isLoading, error, ref }
}

'use client'

import { summary, SummaryType } from '@/actions/summary'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useResult } from '@/store/use-result'
import { Info, Leaf, Wand2 } from 'lucide-react'
import React from 'react'

export const Summary = () => {
  const { result } = useResult()

  const [data, setData] = React.useState<SummaryType | null>(null)

  const fetchSummary = async () => {
    try {
      const data = await summary(result)

      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    setData(null)
    if (result) fetchSummary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  if (!result) return null

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-4">
        <CardTitle className="flex items-center justify-center gap-2">
          <Leaf className="w-5 h-5" />
          <h1 className="text-xl font-semibold">Informações sobre {result}</h1>
        </CardTitle>
        <CardDescription className="flex flex-col justify-center items-center text-center text-sm">
          {data?.description}
          {!data?.description && (
            <>
              <Skeleton className="h-5 w-full my-[0.2rem]" />
              <Skeleton className="h-5 w-full my-[0.2rem]" />
              <Skeleton className="h-5 w-40 my-[0.2rem]" />
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-2 flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Curiosidades
            </div>
            {!data?.description && <Wand2 className="w-4 h-4 animate-pulse" />}
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {data?.funFacts.map((fact, index) => <li key={index}>{fact}</li>)}
            {!data?.funFacts.length &&
              Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="flex">
                  <Skeleton className="h-5 w-full my-[0.1rem]" />
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className="text-md font-medium mb-2 flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Características
            </div>
            {!data?.description && <Wand2 className="w-4 h-4 animate-pulse" />}
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {data?.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
            {!data?.characteristics.length &&
              Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="flex">
                  <Skeleton className="h-5 w-full my-[0.1rem]" />
                </li>
              ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

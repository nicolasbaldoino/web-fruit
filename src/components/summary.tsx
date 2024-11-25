'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useResult } from '@/store/use-result'
import { Info, Leaf } from 'lucide-react'

export const Summary = () => {
  const { result } = useResult()

  if (!result) return null

  const data = {
    name: result,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    funFacts: [
      'Consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et.',
      'Ut enim ad minim veniam.',
      'Quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    ],
    characteristics: [
      'Excepteur sint occaecat cupidatat non proident.',
      'Sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna.',
      'Ut enim ad minim veniam.',
    ],
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-4">
        <CardTitle className="flex items-center justify-center gap-2">
          <Leaf className="w-5 h-5" />
          <h1 className="text-xl font-semibold">
            Informações sobre {data.name}
          </h1>
        </CardTitle>
        <CardDescription className="text-center text-sm">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-md font-medium mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Curiosidades
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {data.funFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-md font-medium mb-2 flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            Características
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {data.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

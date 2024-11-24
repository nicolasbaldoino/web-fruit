'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useResult } from '@/store/use-result'
import { Leaf } from 'lucide-react'

export const Summary = () => {
  const { result } = useResult()

  if (!result) return null

  const data = {
    name: result,
    description:
      'A maçã é uma fruta pomácea da macieira, árvore da família Rosaceae. É um dos frutos mais cultivados no mundo.',
    funFacts: [
      'As maçãs flutuam na água porque 25% do seu volume é ar.',
      'Existem mais de 7.500 variedades de maçãs cultivadas no mundo.',
      'A fobia de maçãs é chamada de malusdomesticaphobia.',
    ],
    characteristics: [
      'Rica em fibras e antioxidantes',
      'Contém vitaminas C, K e potássio',
      'Ajuda a regular o açúcar no sangue',
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
      <CardContent className="space-y-4">
        {/* <div>
          <h3 className="text-md font-medium mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Curiosidades
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
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
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {data.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div> */}
      </CardContent>
    </Card>
  )
}

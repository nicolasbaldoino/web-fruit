'use server'

import { google } from '@ai-sdk/google'
import { streamObject } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  aDescription: z.string(),
  bFunFacts: z.array(z.string()),
  cCharacteristics: z.array(z.string()),
})

export type SummaryType = z.infer<typeof schema>

const prompt = (name: string) => `
Gere um resumo sobre a fruta ou vegetal chamada "${name}", incluindo 5 curiosidades e 5 características.
O resumo deve ser organizado nas seguintes seções:

Curiosidades:
1. [Curiosidade 1]
2. [Curiosidade 2]
3. [Curiosidade 3]
4. [Curiosidade 4]
5. [Curiosidade 5]

Características:
1. [Característica 1]
2. [Característica 2]
3. [Característica 3]
4. [Característica 4]
5. [Característica 5]

Exemplo:

Curiosidades:
1. As maçãs são ricas em fibras e vitamina C.
2. As cenouras originalmente eram roxas, não laranjas.
3. Os tomates são tecnicamente uma fruta, não um vegetal.
4. O brócolis contém mais vitamina C do que uma laranja.
5. As bananas são naturalmente radioativas.

Características:
1. As maçãs são crocantes e suculentas, com uma variedade de cores (vermelha, verde, amarela).
2. As cenouras têm um sabor doce e terroso, geralmente na cor laranja, mas também roxas e amarelas.
3. Os tomates têm uma textura macia e variam em cor, de vermelhos a amarelos e verdes.
4. O brócolis tem um talo firme, de cor verde, com uma cabeça densa e parecida com flores.
5. As bananas possuem uma polpa doce e macia, com uma casca amarela quando maduras.
`

export const generateSummary = async (result: string) => {
  'use server'

  const stream = createStreamableValue()

  ;(async () => {
    const { partialObjectStream } = streamObject({
      model: google('gemini-1.5-pro-latest', {
        structuredOutputs: true,
      }),
      schemaName: 'fruitOrVegetable',
      schema,
      prompt: prompt(result),
      temperature: 1.0,
      topP: 1,
    })

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject)
    }

    stream.done()
  })()

  return { object: stream.value }
}

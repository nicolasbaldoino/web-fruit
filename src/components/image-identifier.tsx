'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import classes from '@/lib/classes'
import { useResult } from '@/store/use-result'
import { zodResolver } from '@hookform/resolvers/zod'
import * as tf from '@tensorflow/tfjs'
import { Cherry, RefreshCw } from 'lucide-react'
import path from 'path'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const modelPath = path.resolve('./model-tfjs/model.json')

async function loadModel() {
  return await tf.loadLayersModel(modelPath)
}

const schema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 200 * 1024 * 1024, {
      message: 'O tamanho do arquivo deve ser menor ou igual a 200MB',
    })
    .refine((file) => file.type.startsWith('image/'), {
      message: 'O arquivo deve ser uma imagem',
    }),
})

type FormData = z.infer<typeof schema>

export const ImageIdentifier = () => {
  const [preview, setPreview] = React.useState<string>('')
  const [loading, setLoading] = React.useState(false)
  const { result, setResult } = useResult()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async ({ file }: FormData) => {
    try {
      setLoading(true)
      const image = new Image()
      image.src = URL.createObjectURL(file)
      image.onload = async () => await identifyImage(image)
    } catch {
      setLoading(false)
      form.setError('file', {
        message: 'Ocorreu um erro ao identificar a imagem',
      })
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    handleFile(selectedFile)
  }

  const handleFile = (file: File | undefined) => {
    if (file) {
      form.setValue('file', file)
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const processImage = (image: HTMLImageElement) => {
    let tensor = tf.browser.fromPixels(image)
    tensor = tensor.resizeNearestNeighbor([224, 224])
    tensor = tensor.expandDims(0)
    tensor = tensor.div(tf.scalar(255))
    return tensor
  }

  const identifyImage = async (image: HTMLImageElement) => {
    const model = await loadModel()
    if (model) {
      const processedImage = processImage(image)
      const predictions = model.predict(processedImage) as tf.Tensor
      const topClass = predictions.argMax(-1).dataSync()[0]

      setResult(classes[topClass])
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-4">
        <CardTitle className="flex items-center justify-center gap-2">
          <Cherry className="w-6 h-6" />
          <h1 className="text-xl font-semibold">Frutas & Vegetais</h1>
        </CardTitle>
        <CardDescription className="text-center text-sm">
          Faça upload de uma imagem para identificar <br />{' '}
          <strong>frutas</strong> ou <strong>vegetais</strong> usando IA
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-input rounded-lg p-8 text-sm text-center hover:border-primary transition-colors"
                  >
                    {preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                    ) : (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleFileChange(e)
                            field.onChange(e.target.files?.[0])
                          }}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Arraste seu arquivo aqui ou clique para fazer para
                          selecionar.
                        </label>
                      </>
                    )}
                  </div>
                  <FormDescription>Tamanho máximo: 200MB</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="space-y-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !form.formState.isValid}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Identificando...
                    </>
                  ) : (
                    'Identificar Imagem'
                  )}
                </Button>
                {result && (
                  <Button
                    type="button"
                    className="w-full"
                    variant="secondary"
                    onClick={() => {
                      setPreview('')
                      setResult('')
                      form.reset()
                    }}
                  >
                    Limpar
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

import { ImageIdentifier } from '@/components/image-identifier'
import { Summary } from '@/components/summary'

export default function Home() {
  return (
    <div className="h-screen flex items-center p-4">
      <div className="bg-background max-h-full flex flex-wrap gap-6 w-full justify-center">
        <ImageIdentifier />
        <Summary />
      </div>
    </div>
  )
}

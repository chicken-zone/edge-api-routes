import type { NextPage } from 'next'
import { CubeTransparentIcon } from '@heroicons/react/solid'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">
      <p className="my-3 text-xl">Concept A</p>
      <CubeTransparentIcon className="h-12 w-12 text-blue-500" />
    </div>
  )
}

export default Home

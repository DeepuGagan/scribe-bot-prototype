
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

 const headline = () => {
  return (
    <div className='center'>
      <h1> Choose headline </h1>
    </div>
  )
}

export default headline
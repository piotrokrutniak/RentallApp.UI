import Image from 'next/image'
import Button from './components/generic/button'
import tesla from '../../public/media/tesla-mirrored.png'
import mallorca from '../../public/media/mallorca-view.jpg'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col m-auto gap-4 max-w-7xl">
      <section id="header-section" className='max-w-7xl bg-black/90 mx-auto w-full p-14 rounded-xl mt-4 shadow-md shadow-black/40'>
        <div className='w-full flex flex-col md:flex-row justify-between'>
          <div className="flex flex-col gap-10 justify-between md:pb-10 text-white">
          <h1 className="text-5xl md:text-6xl"> Rent a <span className="text-vermilion-400">Tesla</span> on Mallorca. </h1>
          <Link href="/book">
            <Button className="w-fit py-4 rounded-lg shadow-md shadow-black hover:bg-vermilion-500 bg-transparent capitalize border-white/50 hover:border-vermilion-500 border-2 text-2xl"> 
              Book Now 
            </Button>
          </Link>
          </div>
          <div className="relative w-full h-96 left-0 flex gap-10 pt-3 overflow-x-auto m-auto justify-around select-none md:pb-10">
              <Image src={tesla} layout="fill" objectFit="contain" alt="Breakfast Photo" className="h-96 group-hover:opacity-50"/>
          </div>
        </div>
      </section>

      <section id="searchbar-section" className='overflow-clip max-w-7xl relative bg-red-500/30 px-7 h-80 m-auto w-full p-8 sm:px-16 rounded-xl shadow-md shadow-black/40 flex-col'>
        <Image src={mallorca} layout="fill" objectFit="cover" alt="Breakfast Photo" className="w-full opacity-60 group-hover:opacity-50"/>
        <header className="absolute flex flex-col gap-5 text-4xl z-10 text-white top-0 left-0 p-6">
        <h1 className="">Always reliable, always affordable.</h1>
        <h1 className="font-bold">RentTesla.es</h1>
        </header>
      </section>
    </main>
  )
}
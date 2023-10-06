import Image, { StaticImageData } from 'next/image'
import { FaMugHot, FaCookieBite, FaHamburger, FaFireAlt, FaBookmark, FaRegBookmark } from 'react-icons/fa'
import CookingSvg from './components/svgComponents/CookingSvg'
import Rating from './components/generic/rating'
import Button from './components/generic/button'
import tesla from '../../public/media/tesla-mirrored.png'
import lunch from '../../public/media/mallorca-view.jpg'
import dessert from '../../public/media/dessert.jpg'
import strawberryCake from '../../public/media/recipes/strawberryCake.jpg'
import greekMeatLoaf from '../../public/media/recipes/greekMeatLoaf.jpg'
import vanillaIceCream from '../../public/media/recipes/vanillaIceCream.jpg'
import { useState } from 'react'
import { RecipeListing } from './components/generic/recipeListing'
import { Input } from 'postcss'
import SearchBar from './components/generic/searchBar'

export default function Home() {
  return (
    <main className="flex flex-col m-auto gap-4">
      <section id="header-section" className='max-w-7xl bg-black/90 m-auto w-full px-14 py-8 rounded-xl mt-4 shadow-md shadow-black/40'>
        <div className="sm:p-8 pb-14 flex justify-between">
          
        </div>
        <div className='w-full flex justify-between'>
          <div className="flex flex-col gap-10 justify-between pb-10 text-white">
          <h1 className="text-5xl md:text-6xl"> Rent a <span className="text-vermilion-400">Tesla</span> on Mallorca. </h1>
          <Button className="w-fit py-4 rounded-lg shadow-md shadow-black hover:bg-vermilion-500 bg-transparent capitalize border-white/50 hover:border-vermilion-500 border-2 text-2xl"> 
            Book Now 
          </Button>
          </div>
          <div className="relative w-full h-96 left-0 flex gap-10 pt-3 overflow-x-auto m-auto justify-around select-none pb-10">
              <Image src={tesla} layout="fill" objectFit="contain" alt="Breakfast Photo" className="h-96 group-hover:opacity-50"/>
              
          </div>
        </div>
      </section>

      <section id="searchbar-section" className='overflow-clip max-w-7xl relative bg-red-400/50 px-7 h-80 m-auto w-full p-8 sm:px-16 rounded-xl shadow-md shadow-black/40 flex-col'>
        <Image src={lunch} layout="fill" objectFit="cover" alt="Breakfast Photo" className="w-full opacity-70 group-hover:opacity-50"/>
        <h1 className="absolute text-5xl z-10 text-white top-0 left-0 p-8">Always reliable, always affordable.</h1>
      </section>
    </main>
  )
}
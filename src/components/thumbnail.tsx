import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface IProps {
  thumbnail: string | StaticImageData
  id: string
}

export const Thumbnail: React.FC<IProps> = ({ thumbnail }) => {
  return (
    <div className='flex overflow-hidden rounded-md'>
      <Image
        src={thumbnail}
        alt="product"
        placeholder="blur"
        className="object-cover"
      />
    </div>
  )
}

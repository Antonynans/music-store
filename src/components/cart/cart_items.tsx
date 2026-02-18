import { ICartItem } from '../../models/cart'
import Image from 'next/image'
import { motion } from 'motion/react'
import Link from 'next/link'
import { products } from '../../data'
import { Quantity } from '../quantity'

interface IProps {
  item: ICartItem
}

export const CartItem: React.FC<IProps> = ({ item }) => {
  const product = products.find(product => product.id === item.id)

  if (!product) {
    return null
  }

  const nf = new Intl.NumberFormat();
  const productForQuantity = { ...product, image: { mobile: product.image.mobile.src, tablet: product.image.tablet.src, desktop: product.image.desktop.src } };

  return (
    <motion.li layout>
      <div className='flex gap-4 items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='w-16 h-16 rounded-sm overflow-hidden'>
            <Image
              src={product.image.mobile}
              alt={product.name}
              className="object-cover"
            />
          </div>
          <div className='text-sm'>
            <Link href={`/product/${product.slug}`}
              className='font-black hover:text-orange-500'>{product.shortName}
            </Link>
            <p className='{css.price}'>
             
              ${nf.format(product.price)}
            </p>
          </div>
        </div>
        <Quantity product={productForQuantity} transparent maxwidth={100} isHidden={false} />
      </div>
    </motion.li>
  )
}

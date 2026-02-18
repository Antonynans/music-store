'use client'
import { usePathname } from 'next/navigation';
import { SiFacebook, SiTwitter, SiInstagram } from 'react-icons/si'
import Link from 'next/link'
import { routes } from '../utils/routes';

const style = {
  active: ` text-orange-500 `,
};

export const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  const pathname = usePathname()

  return (
    <div className=" bg-black text-white">
      <div className='xl:w-2/3 w-11/12 container mx-auto'>
      <div className='flex items-center pt-12 flex-col md:flex-row justify-between'>
        <p className='text-2xl font-semibold tracking-[0.06rem]'>audiStore</p>
        <ul className='flex flex-col md:flex-row md:gap-10 '>
            {routes.map(route => {
              const { title, slug } = route

              const isCurrent = pathname.includes(title)
              const isCategory = pathname.includes(title)
              const isSubCategory = pathname.includes(
                title.substring(0, title.length - 1),
              )
              return (
                <li key={route.title} className='uppercase font-semibold text-3xl text-center hover:text-orange-500'>
                  <Link href={route.slug}
                    
                      className={`text-sm leading-snug;
                      ${pathname === '/' && slug === '/' && style.active} ${isCurrent && style.active} ${isCategory && style.active} ${isSubCategory && style.active}`}
                     
                    >
                      {route.title}
                  </Link>
                </li>
              )
            })}
          </ul>
     
      </div>
      <p className='text-white opacity-70 leading-6 text-[0.93rem] text-center py-8 max-w-135 md:text-left'>
          Audiophile is an all in one stop to fulfill your audio needs. We&apos;re a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>
        <div className='flex items-center justify-between flex-col md:flex-row text-white opacity-70 leading-6 text-sm text-center pb-8 gap-4'>
          <p className=''>Copyright {year}. All Rights Reserved</p>
          <ul className='flex text-[1.3rem] md:text-[1.7rem] gap-4'>
            {socials.map(soc => {
              return (
                <li key={soc.title} className='hoverBtn hover:text-orange-500'>
                  <a
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    title={soc.title}
                  >
                    {soc.icon}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        </div>
    </div>
  )
}


const socials = [
  {
    title: 'facebook',
    href: 'https://www.facebook.com/',
    icon: <SiFacebook />,
  },
  {
    title: 'twitter',
    href: 'https://twitter.com/iiamantoni',
    icon: <SiTwitter />,
  },
  {
    title: 'instagram',
    href: 'https://www.instagram.com/',
    icon: <SiInstagram />,
  },
]

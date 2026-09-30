import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Nav from './Nav'
import styles from './Header.module.scss'

export default function Header({ settings }) {
  const { siteName, siteSubheading, siteLogo, menuItems = [] } = settings

  return (
    <header className={`container ${styles.header}`}>
      <Link href="/" className={styles.brand}>
        {siteLogo?.asset ? (
          <Image
            src={urlFor(siteLogo).height(96).url()}
            alt={siteLogo.alt || siteName || 'Home'}
            width={240}
            height={48}
            className={styles.logo}
            loading="eager"
          />
        ) : (
          <span className={styles.name}>{siteName || 'Portfolio'}</span>
        )}
        {siteSubheading && <span className={styles.subheading}>{siteSubheading}</span>}
      </Link>

      <Nav items={menuItems} />
    </header>
  )
}

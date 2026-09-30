import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/client'
import { aboutQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { buildMetadata } from '@/sanity/lib/seo'
import styles from './about.module.scss'

export async function generateMetadata() {
  return buildMetadata({ title: 'About' })
}

export default async function AboutPage() {
  const about = (await sanityFetch(aboutQuery)) || {}

  return (
    <div className={`container ${styles.about}`}>
      {about.image?.asset && (
        <div className={styles.image}>
          <Image
            src={urlFor(about.image).width(1200).url()}
            alt={about.image.alt || 'Portrait'}
            width={1200}
            height={1500}
            sizes="(max-width: 767px) 100vw, 40vw"
            loading="eager"
          />
        </div>
      )}
      <div className={styles.text}>
        {about.bio && <p className="pre-line">{about.bio}</p>}
        {about.cvUrl && (
          <a href={`${about.cvUrl}?dl=`} className={styles.cv} target="_blank" rel="noopener noreferrer">
            Download CV ↓
          </a>
        )}
      </div>
    </div>
  )
}

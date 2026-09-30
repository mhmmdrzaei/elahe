'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { urlFor } from '@/sanity/lib/image'
import styles from './Slider.module.scss'

export default function Slider({ images = [], title }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1 })
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on('select', onSelect).on('reInit', onSelect)
    return () => emblaApi.off('select', onSelect).off('reInit', onSelect)
  }, [emblaApi])

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  if (!images.length) return null

  return (
    <section className={styles.slider} aria-roledescription="carousel" aria-label={`${title} images`}>
      <div className={styles.viewport} ref={emblaRef} tabIndex={0} onKeyDown={onKeyDown}>
        <div className={styles.track}>
          {images.map((img, i) => (
            <div
              key={img._key || i}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
            >
              <Image
                src={urlFor(img).width(2400).fit('max').quality(90).url()}
                alt={img.alt || `${title} — image ${i + 1}`}
                fill
                quality={90}
                sizes="(max-width: 767px) 100vw, 70vw"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className={styles.controls}>
          <div className={styles.dots}>
            {images.map((img, i) => (
              <button
                key={img._key || i}
                type="button"
                className={i === selected ? styles.dotActive : styles.dot}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === selected}
              />
            ))}
          </div>
          <div className={styles.arrows}>
            <button type="button" onClick={prev} aria-label="Previous image">
              <Arrow direction="left" />
            </button>
            <button type="button" onClick={next} aria-label="Next image">
              <Arrow direction="right" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

function Arrow({ direction }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M11 7H3M6.5 3.5L3 7l3.5 3.5' : 'M3 7h8M7.5 3.5L11 7l-3.5 3.5'}
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

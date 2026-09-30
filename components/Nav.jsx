'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.scss'

export default function Nav({ items = [] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close the menu after navigating
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  if (!items.length) return null

  return (
    <nav className={styles.nav}>
      <button
        type="button"
        className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span />
        <span />
      </button>

      <ul id="site-menu" className={`${styles.list} ${open ? styles.listOpen : ''}`}>
        {items.map(({ _key, label, url }) => {
          const external = /^https?:\/\//.test(url)
          return (
            <li key={_key}>
              {external ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              ) : (
                <Link href={url} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

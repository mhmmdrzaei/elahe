import { PortableText } from 'next-sanity'
import styles from './RichText.module.scss'

const components = {
  block: {
    h2: ({ children }) => <h2 className={styles.large}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.medium}>{children}</h3>,
    small: ({ children }) => <p className={styles.small}>{children}</p>,
  },
  marks: {
    underline: ({ children }) => <u>{children}</u>,
    link: ({ value, children }) => {
      const href = value?.href || ''
      const external = /^https?:\/\//.test(href)
      return (
        <a href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
          {children}
        </a>
      )
    },
  },
}

export default function RichText({ value }) {
  if (!value?.length) return null
  return (
    <div className={styles.richText}>
      <PortableText value={value} components={components} />
    </div>
  )
}

import ContactForm from '@/components/ContactForm'
import { sanityFetch } from '@/sanity/lib/client'
import { contactQuery } from '@/sanity/lib/queries'
import { buildMetadata } from '@/sanity/lib/seo'
import styles from './contact.module.scss'

export async function generateMetadata() {
  return buildMetadata({ title: 'Contact' })
}

export default async function ContactPage() {
  const contact = (await sanityFetch(contactQuery)) || {}

  return (
    <div className={`container ${styles.contact}`}>
      <div className={styles.info}>
        {contact.email && (
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        )}
        {contact.phone && (
          <p>
            <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a>
          </p>
        )}
        {contact.otherInfo && <p className={`pre-line ${styles.other}`}>{contact.otherInfo}</p>}
      </div>
      <ContactForm />
    </div>
  )
}

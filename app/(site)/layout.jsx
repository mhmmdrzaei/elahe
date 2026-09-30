import '@/styles/globals.scss'
import Header from '@/components/Header'
import { sanityFetch } from '@/sanity/lib/client'
import { settingsQuery } from '@/sanity/lib/queries'
import { buildMetadata } from '@/sanity/lib/seo'

export async function generateMetadata() {
  return buildMetadata()
}

export default async function SiteLayout({ children }) {
  const settings = (await sanityFetch(settingsQuery)) || {}

  return (
    <>
      <Header settings={settings} />
      <main>{children}</main>
    </>
  )
}

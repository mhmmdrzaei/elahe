import RichText from '@/components/RichText'
import { sanityFetch } from '@/sanity/lib/client'
import { linksQuery } from '@/sanity/lib/queries'
import { buildMetadata } from '@/sanity/lib/seo'

export async function generateMetadata() {
  const links = await sanityFetch(linksQuery)
  return buildMetadata({ title: links?.title || 'Links' })
}

export default async function LinksPage() {
  const links = (await sanityFetch(linksQuery)) || {}

  return (
    <div className="container">
      <h1 className="page-title">{links.title || 'Links'}</h1>
      <RichText value={links.content} />
    </div>
  )
}

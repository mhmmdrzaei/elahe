import { sanityFetch } from './client'
import { settingsQuery } from './queries'
import { urlFor } from './image'

// Builds page metadata, falling back to the Settings SEO fields.
export async function buildMetadata({ title, description, image } = {}) {
  const settings = (await sanityFetch(settingsQuery)) || {}
  const desc = description || settings.seoDescription || undefined
  const img = image?.asset ? image : settings.seoImage
  const ogImage = img?.asset ? urlFor(img).width(1200).height(630).fit('crop').url() : undefined
  const siteName = settings.siteName || 'Portfolio'
  const fullTitle = title ? `${title} — ${siteName}` : siteName

  return {
    title: fullTitle,
    description: desc,
    openGraph: {
      title: fullTitle,
      description: desc,
      siteName,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: ogImage ? 'summary_large_image' : 'summary', title: fullTitle, description: desc },
  }
}

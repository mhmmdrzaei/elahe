'use client'

// Serves every next/image straight from Sanity's image CDN, so Vercel's image
// optimization (which has a small monthly limit on the free plan) is never used.
export default function sanityImageLoader({ src, width, quality }) {
  const url = new URL(src)
  const params = url.searchParams

  // Scale a fixed height with the width so cropped images keep their shape
  const w = Number(params.get('w'))
  const h = Number(params.get('h'))
  if (w && h) params.set('h', String(Math.round((h * width) / w)))

  params.set('w', String(width))
  params.set('q', String(quality || params.get('q') || 75))
  params.set('auto', 'format')
  if (!params.has('fit')) params.set('fit', 'max')

  return url.toString()
}

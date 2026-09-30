import { Fragment } from 'react'
import Link from 'next/link'

export default function CategoryTags({ categories, className }) {
  if (!categories?.length) return null

  return (
    <span className={className}>
      {categories.map((cat, i) => (
        <Fragment key={cat.slug}>
          {i > 0 && ' / '}
          <Link href={`/category/${cat.slug}`}>{cat.title}</Link>
        </Fragment>
      ))}
    </span>
  )
}

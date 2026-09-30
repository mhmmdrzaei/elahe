import { notFound } from 'next/navigation'
import ProjectGrid from '@/components/ProjectGrid'
import { sanityFetch } from '@/sanity/lib/client'
import { categorySlugsQuery, projectsByCategoryQuery } from '@/sanity/lib/queries'
import { buildMetadata } from '@/sanity/lib/seo'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = (await sanityFetch(categorySlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { category } = await sanityFetch(projectsByCategoryQuery, { slug })
  return buildMetadata({ title: category?.title })
}

export default async function CategoryPage({ params }) {
  const { slug } = await params
  const { category, projects } = await sanityFetch(projectsByCategoryQuery, { slug })
  if (!category) notFound()

  return (
    <div className="container">
      <h1 className="page-title">{category.title}</h1>
      <ProjectGrid projects={projects} />
    </div>
  )
}

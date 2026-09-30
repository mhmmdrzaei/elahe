import { notFound } from 'next/navigation'
import Slider from '@/components/Slider'
import CategoryTags from '@/components/CategoryTags'
import { sanityFetch } from '@/sanity/lib/client'
import { projectQuery, projectSlugsQuery } from '@/sanity/lib/queries'
import { buildMetadata } from '@/sanity/lib/seo'
import styles from './project.module.scss'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = (await sanityFetch(projectSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await sanityFetch(projectQuery, { slug })
  if (!project) return {}
  return buildMetadata({
    title: project.title,
    description: project.seoDescription,
    image: project.seoImage,
  })
}

function youtubeEmbedUrl(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    let id = null
    if (u.hostname.includes('youtu.be')) id = u.pathname.slice(1)
    else if (u.pathname.startsWith('/embed/') || u.pathname.startsWith('/shorts/')) id = u.pathname.split('/')[2]
    else id = u.searchParams.get('v')
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
  } catch {
    return null
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = await sanityFetch(projectQuery, { slug })
  if (!project) notFound()

  const embed = youtubeEmbedUrl(project.videoUrl)

  return (
    <article className={`container ${styles.project}`}>
      <div className={styles.media}>
        <Slider images={project.images} title={project.title} />

        {embed && (
          <div className={styles.video}>
            <iframe
              src={embed}
              title={`${project.title} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className={styles.text}>
        <header className={styles.header}>
          <h1 className={styles.title}>{project.title}</h1>
          {project.year && <p className={styles.year}>{project.year}</p>}
          <CategoryTags categories={project.categories} className={styles.tags} />
        </header>

        {project.description && <p className="pre-line">{project.description}</p>}
      </div>
    </article>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import CategoryTags from './CategoryTags'
import styles from './ProjectGrid.module.scss'

export default function ProjectGrid({ projects = [] }) {
  if (!projects.length) return <p className={styles.empty}>No projects yet.</p>

  return (
    <ul className={styles.grid}>
      {projects.map((project, i) => (
        <li key={project._id} className={styles.item}>
          <Link href={`/projects/${project.slug}`} className={styles.imageLink}>
            {project.image?.asset ? (
              <Image
                src={urlFor(project.image).width(1200).height(900).fit('crop').url()}
                alt={project.image.alt || project.title}
                width={1200}
                height={900}
                sizes="(max-width: 767px) 100vw, 50vw"
                loading={i < 2 ? 'eager' : 'lazy'}
              />
            ) : (
              <div className={styles.placeholder} />
            )}
          </Link>
          <div className={styles.meta}>
            <Link href={`/projects/${project.slug}`} className={styles.title}>
              {project.title}
            </Link>
            <CategoryTags categories={project.categories} className={styles.tags} />
          </div>
        </li>
      ))}
    </ul>
  )
}

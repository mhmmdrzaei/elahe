import ProjectGrid from '@/components/ProjectGrid'
import { sanityFetch } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'

export default async function HomePage() {
  const projects = await sanityFetch(projectsQuery)

  return (
    <div className="container">
      <ProjectGrid projects={projects} />
    </div>
  )
}

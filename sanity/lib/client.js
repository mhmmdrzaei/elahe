import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// useCdn: false so a build started by a publish always gets the newest content
// (the CDN can lag a few seconds behind).
export const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

// The whole site is built as static pages. Content only changes when Sanity's
// publish webhook triggers a Vercel redeploy, so results are cached for the
// lifetime of each build.
export function sanityFetch(query, params = {}) {
  return client.fetch(query, params, { cache: 'force-cache' })
}

import { defineQuery } from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  siteName, siteSubheading, siteLogo, menuItems[]{_key, label, url},
  seoDescription, seoImage
}`)

const projectCard = `
  _id, title, "slug": slug.current,
  "image": images[0],
  "categories": categories[]->{title, "slug": slug.current}
`

const projectOrder = `order(coalesce(orderRank, 99999) asc, year desc, _createdAt desc)`

export const projectsQuery = defineQuery(`*[_type == "project" && defined(slug.current)] | ${projectOrder} {${projectCard}}`)

export const projectsByCategoryQuery = defineQuery(`{
  "category": *[_type == "category" && slug.current == $slug][0]{title, "slug": slug.current},
  "projects": *[_type == "project" && defined(slug.current) && $slug in categories[]->slug.current] | ${projectOrder} {${projectCard}}
}`)

export const projectQuery = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, year, description, images, videoUrl,
  "categories": categories[]->{title, "slug": slug.current},
  seoDescription, seoImage
}`)

export const projectSlugsQuery = defineQuery(`*[_type == "project" && defined(slug.current)].slug.current`)

export const categorySlugsQuery = defineQuery(`*[_type == "category" && defined(slug.current)].slug.current`)

export const aboutQuery = defineQuery(`*[_type == "about"][0]{
  image, bio, "cvUrl": cv.asset->url
}`)

export const contactQuery = defineQuery(`*[_type == "contact"][0]{ email, phone, otherInfo }`)

export const linksQuery = defineQuery(`*[_type == "links"][0]{ title, content }`)

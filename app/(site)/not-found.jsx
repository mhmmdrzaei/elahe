import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container">
      <h1 className="page-title">Page not found</h1>
      <Link href="/">← Back to projects</Link>
    </div>
  )
}

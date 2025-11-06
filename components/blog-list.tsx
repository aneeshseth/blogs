"use client"

import Link from "next/link"

interface Blog {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
}

interface BlogListProps {
  blogs: Blog[]
}

export default function BlogList({ blogs }: BlogListProps) {
  if (blogs.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No blogs yet. Create your first post!</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {blogs.map((blog) => (
        <article key={blog.id} className="group">
          <Link href={`/blog/${blog.id}`} className="block">
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground group-hover:text-muted-foreground transition-colors">
                  {blog.title}
                </h2>
                <time className="text-sm text-muted-foreground whitespace-nowrap ml-4">{blog.date}</time>
              </div>
              <p className="text-foreground/70 text-base">{blog.excerpt}</p>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-foreground/80 leading-relaxed text-base">{blog.content}</p>
            </div>
          </Link>

          <div className="h-px bg-border mt-8"></div>
        </article>
      ))}
    </div>
  )
}

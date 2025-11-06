"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface AddBlogFormProps {
  onSubmit: (blog: { title: string; date: string; excerpt: string; content: string }) => void
}

export default function AddBlogForm({ onSubmit }: AddBlogFormProps) {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      alert("Please fill in all fields")
      return
    }

    const today = new Date()
    const date = today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

    onSubmit({
      title: title.trim(),
      date,
      excerpt: excerpt.trim(),
      content: content.trim(),
    })

    setTitle("")
    setExcerpt("")
    setContent("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title..."
          className="w-full bg-card border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Excerpt</label>
        <input
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary..."
          className="w-full bg-card border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog post..."
          rows={6}
          className="w-full bg-card border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="bg-foreground text-background hover:bg-muted-foreground">
          Publish
        </Button>
      </div>
    </form>
  )
}

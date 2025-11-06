"use client"

interface HeaderProps {
  onAddClick?: () => void
}

export default function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="px-6 md:px-12 py-4 flex items-center justify-between max-w-full">
        <div className="md:hidden">
          <h2 className="text-lg font-semibold text-foreground">Aneesh Seth</h2>
        </div>
      </div>
    </header>
  )
}

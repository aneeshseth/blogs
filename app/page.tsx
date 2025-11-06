import BlogList from "@/components/blog-list";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Blog {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const blogs: Blog[] = [
  {
    id: "1",
    title: "Data movement tools - Part 1 (Data Extraction)",
    date: "Nov 5, 2025",
    excerpt: "Challenges in building data movement tools - Part 1",
    content: `
         So here is the context. I currently work at a Series A company (Monad.com), where I work on building ETL flows for customers to move security data. I’ve been learning about this space for the last ~1.5 years, and this write up is generally an amalgamation of my learnings.
      `,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border px-8 py-12 hidden md:block sticky top-0 h-screen">
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Aneesh Seth
              </h1>
              <p className="text-muted-foreground text-sm">
                Thoughts on engineering
              </p>
            </div>

            <nav className="space-y-4">
              <div className="h-px bg-border"></div>
              <a
                href="/"
                className="block text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                All Posts
              </a>
              <div className="h-px bg-border"></div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 px-6 md:px-12 py-12 max-w-3xl mx-auto w-full">
          <BlogList blogs={blogs} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

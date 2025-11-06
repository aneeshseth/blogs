export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="px-6 md:px-12 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Contact
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:hello@aneeshseth.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    aneeshseth2018@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Social
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.linkedin.com/in/aneesh-seth-3b3508247/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="h-px bg-border mb-6"></div>

          <div className="text-xs text-muted-foreground text-center">
            <p>© 2025 Aneesh Seth. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

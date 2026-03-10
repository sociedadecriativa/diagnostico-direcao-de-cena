import { ReactNode } from "react";
import { ProgressBar } from "./ProgressBar";
import { ThemeToggle } from "./ThemeToggle";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  showProgress?: boolean;
}

export function Layout({ children, showProgress = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {showProgress ? (
              <div className="flex-1 max-w-xs">
                <ProgressBar />
              </div>
            ) : (
              <div />
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}

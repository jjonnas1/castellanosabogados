'use client';

import SiteHeader from '@/app/components/SiteHeader';
import BlogList from '@/app/components/BlogList';
import type { blogArticles } from '@/lib/blogIndex';
import { useLanguage } from '@/contexts/LanguageContext';



export default function BlogClient({ articles }: { articles: typeof blogArticles }) {
  const { t } = useLanguage();
  const p = t.pages.blog;

  return (
    <main className="motion-public motion-inner editorial-page editorial-blog min-h-screen bg-canvas text-ink">
      <SiteHeader />

      <section className="motion-blog-hero section-shell" style={{ backgroundImage: "linear-gradient(90deg, rgba(18,15,16,.88), rgba(18,15,16,.58)), url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=82&fm=webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container space-y-8">
          <div className="space-y-2">
            <p className="pill w-fit">{p.badge}</p>
            <h1>{p.heroTitle}</h1>
            <p className="max-w-2xl text-muted">{p.heroSubtitle}</p>
          </div>

        </div>
      </section>
      <section className="motion-blog-list section-shell"><div className="container">
          <BlogList articles={articles} />
        </div>
      </section>
    </main>
  );
}

'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('is-revealed');
          reveal.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    function observeNew() {
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => reveal.observe(el));
    }

    observeNew();

    // Catch elements added by client-side rendering after mount
    const mutation = new MutationObserver(observeNew);
    mutation.observe(document.body, { subtree: true, childList: true });

    return () => {
      reveal.disconnect();
      mutation.disconnect();
    };
  }, [pathname]);

  return null;
}

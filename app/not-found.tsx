/**
 * File: app/not-found.tsx
 * Role: Application-wide not-found page.
 * Use: Provides a semantic response when a requested route does not exist.
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>The requested page could not be found.</p>
      <Link href="/">Return home</Link>
    </main>
  );
}

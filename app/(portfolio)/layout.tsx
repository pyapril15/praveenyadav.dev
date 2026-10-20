/**
 * File: app/(portfolio)/layout.tsx
 * Role: Shared layout for public portfolio routes.
 * Use: Wraps portfolio pages while keeping the route group out of public URLs.
 */

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

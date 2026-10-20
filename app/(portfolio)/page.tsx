/**
 * File: app/(portfolio)/page.tsx
 * Role: Visible placeholder for the portfolio home route.
 * Use: Confirms the site is online while approved portfolio content is prepared.
 */

export default function PortfolioHomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-foreground/60">
          Praveen Yadav · Portfolio
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Portfolio in progress
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/70">
          The site foundation is in place. Profile details and project
          information will appear here once they are ready to share.
        </p>
      </section>
    </main>
  );
}

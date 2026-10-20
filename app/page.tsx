/**
 * File: app/page.tsx
 * Role: Static-first portfolio landing page.
 * Use: Introduces the portfolio and marks content areas awaiting approved details.
 */

const sections = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Praveen Yadav home">
          PY<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          {sections.map((section) => (
            <a key={section.href} href={section.href}>
              {section.label}
            </a>
          ))}
        </nav>
        <span className="header-status">
          <span aria-hidden="true" />
          Portfolio in progress
        </span>
      </header>

      <main id="main-content">
        <section className="hero section-shell" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span>Portfolio</span>
              <span className="eyebrow-divider" aria-hidden="true" />
              <span>First release</span>
            </p>
            <h1 id="hero-title">
              Praveen
              <br />
              <span>Yadav</span>
              <span className="title-period">.</span>
            </h1>
            <p className="hero-description">
              A home for selected work, background, and ways to connect.
              Approved details are being gathered before they are published.
            </p>
            <a className="text-link" href="#work">
              Explore the portfolio <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="art-grid" />
            <div className="art-orbit art-orbit-one" />
            <div className="art-orbit art-orbit-two" />
            <div className="art-disc">
              <span>PY</span>
            </div>
            <p className="art-caption">A considered space for good work.</p>
            <span className="art-index">01 / 04</span>
          </div>

          <div className="hero-footnote">
            <span>Personal portfolio</span>
            <span>Content-first · Static-first</span>
          </div>
        </section>

        <section
          className="content-section section-shell"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title">Work worth sharing.</h2>
          </div>
          <div className="empty-state work-empty">
            <div className="empty-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div>
              <p className="empty-kicker">Case studies are in preparation</p>
              <p className="empty-copy">
                Project stories will appear here after the details and
                publication permissions are confirmed.
              </p>
            </div>
            <span className="empty-number" aria-hidden="true">
              01
            </span>
          </div>
        </section>

        <section
          className="about-section section-shell"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-label">
            <p className="eyebrow">02 / About</p>
            <span className="about-stamp" aria-hidden="true">
              P
            </span>
          </div>
          <div className="about-copy">
            <h2 id="about-title">The person behind the work.</h2>
            <p>
              A short biography, experience, and areas of focus will be added
              here once the wording is approved for publication.
            </p>
          </div>
        </section>

        <section
          className="contact-section section-shell"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div>
            <p className="eyebrow">03 / Contact</p>
            <h2 id="contact-title">Let&apos;s make the next thing matter.</h2>
          </div>
          <div className="contact-note">
            <p>
              Public contact details and profile links will be added when
              approved. Nothing private is displayed here.
            </p>
            <span className="contact-symbol" aria-hidden="true">
              ↗
            </span>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <a className="wordmark" href="#top" aria-label="Back to top">
          PY<span>.</span>
        </a>
        <p>Praveen Yadav · Portfolio in progress</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}

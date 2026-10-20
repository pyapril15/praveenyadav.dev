/**
 * File: app/robots.ts
 * Role: Robots metadata for the scaffold-only portfolio routes.
 * Use: Prevents indexing until approved portfolio content is published.
 */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

// Written descriptions for repos that don't have one on GitHub.
const notes: Record<string, string> = {
  "velo-app-backend": "NestJS + Prisma API for Velo, a mobile-money finance app that parses MTN & Airtel SMS on-device.",
  "dent-wise": "Dental practice platform: bookings, records and doctor management. Next.js 15, Clerk, Prisma.",
  "smart-folder-organizer": "Dependency-free Python CLI that sorts cluttered folders by file type. Never overwrites.",
  "career-space": "React Native (Expo) career app.",
  "career-space-backend": "TypeScript API powering Career Space.",
  // vehicle_ml_dashboard: "Machine-learning dashboard for exploring and predicting on vehicle data.",
  // eduportal: "Python education portal.",
  "mobile-wallet": "JavaScript mobile wallet app.",
  "wallet-backend": "JavaScript API for the mobile wallet.",
  recurlly: "Expo (React Native) app.",
  luminiere: "Expo mobile app.",
  "event-platform": "Next.js event platform.",
  podcastr: "Next.js podcast platform.",
  imaginify: "AI image transformation SaaS with Next.js and Stripe.",
  "book-wise": "TypeScript app.",
  roomify: "Front-end build.",
  // recipe_finder_backend: "Node.js API for a recipe finder.",
  // temperate_app: "HTML app.",
  "Joystick-wireless-control": "Python wireless joystick control.",
  // "mobile-app-form": "Reusable React Native form components.",
  // "mobile-app-modal": "Reusable React Native modal components.",
  // portfolio: "A previous version of this portfolio.",
};

// Repos left out of the Lab page.
const hidden = new Set([
  "vehicle_ml_dashboard",
  "mobile-app-modal",
  "mobile-app-form",
  "eduportal",
  "portfolio",
  "tap_and_pay",
  "recipe_finder_backend",
]);

export const langColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#663399",
};

export async function getRepos(user: string): Promise<Repo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(String(res.status));
    const repos = (await res.json()) as Repo[];
    return repos
      .filter((r) => !r.fork && !hidden.has(r.name))
      .map((r) => ({ ...r, description: r.description || notes[r.name] || null }));
  } catch {
    // Offline or rate-limited: fall back to the known list so the page still renders.
    return Object.entries(notes).map(([name, description]) => ({
      name,
      description,
      language: null,
      html_url: `https://github.com/${user}/${name}`,
      homepage: null,
      stargazers_count: 0,
      pushed_at: "",
      fork: false,
    }));
  }
}

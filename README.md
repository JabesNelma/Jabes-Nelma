# Portfolio Content Guide

This repository uses a centralized TypeScript data file to manage displayed content (projects, skills, profile info).

Files
- `src/data/content.ts` — main typed data source. Edit this file to add or update projects, skills, and profile info.
- `src/data/projects.ts` — adapter that maps `content.projects` to the shape expected by the existing `Projects` component. Handles `category` as an array.
- `public/projects/` — put project images here and reference them from `image` fields (e.g. `/projects/my-app.png`).

How to add a project (quick)
1. Add your image to `public/projects/your-image.png`.
2. Open `src/data/content.ts` and copy the project template (at the bottom of the file).
3. Paste the object into the `projects` array and fill fields (use kebab-case for `id`).
4. Commit & push to GitHub — Vercel will rebuild and deploy.

Project template

```ts
{
  id: "p-slug",
  title: "Judul Project",
  description: "Ringkasan singkat",
  year: 2025,
  tech: ["Next.js","ethers.js"],
  category: ["frontend","web3"],
  repo: "https://github.com/...",
  demo: "https://...",
  image: "/projects/your-image.png"
}
```

**Note:** The `category` field accepts an array of categories. All categories will be displayed as badges below the technology stack in the project card.

How to add a skill
1. Open `src/data/content.ts`.
2. Add an object to the `skills` array. Use `category` with one or more of: `backend`, `frontend`, `web3`.

Example skill

```ts
{ id: 'nest', name: 'NestJS', category: ['backend'], level: 'advanced' }
```

Notes
- All project categories (e.g., `frontend`, `web3`) are now displayed together as badges below the technology stack.
- We intentionally keep the UI components unchanged. The code maps the typed `content` into the format current components expect.
- If you need a non-developer UI to add content later, we can add a small admin page or a CLI script that updates `src/data/content.ts` or `content.json`.

That's it — add entries, commit, push, and the site will update on Vercel after build.

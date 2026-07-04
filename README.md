# The Limits of Power

An interactive historical atlas of ideas about law, conscience, church, family, civil society, and civil government.

## What this starter includes

- A curated main lineage: Old Testament → early Christian thought → medieval and English legal development → Reformation and post-Reformation Protestantism → colonial America → American constitutional order → modern contest over state power.
- Parallel contributing streams, later retrievals, and institutional revisions.
- Beginner and expert reading modes.
- A source drawer for every node.
- A domains view explaining "Who governs what?"
- A mobile-friendly guided story mode.
- A typed, manually curated data model in `src/data/atlas.ts`.

## Local use

Requires Node 22 or newer.

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

The static output is generated in `dist/` and can be deployed to GitHub Pages, Cloudflare Pages, Netlify, or any static host.

## Editorial model

Every atlas node should have:

- a beginner explanation;
- a more technical explanation;
- a historical classification: primary inheritance, contributing influence, institutional revision, or later retrieval;
- primary sources or authoritative editions;
- a manually curated position on the interactive map.

Do not use an LLM as the final authority for historical claims or citations. Use it for drafting and organization; review sources before publishing.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the source.
3. The included workflow builds the static site with a repository-aware base path and deploys `dist/` after every push to `main`.

For a custom domain, set the domain in GitHub Pages and add its `CNAME` file through GitHub’s interface or a later project update.

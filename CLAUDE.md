# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager**: Use `pnpm` exclusively (enforced by preinstall script)

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start development server at localhost:4321 |
| `pnpm build` | Build production site with Pagefind search indexing |
| `pnpm preview` | Preview production build |
| `pnpm type-check` | Run TypeScript type checking with isolated declarations |
| `pnpm lint` | Lint and auto-fix code with Biome |
| `pnpm format` | Format code with Biome |
| `pnpm new-post <filename>` | Create new blog post with frontmatter template |

## Project Architecture

This is a **Fuwari** blog template built with Astro, featuring a static site generator with enhanced markdown processing and multilingual support.

### Core Technologies
- **Astro** (v5.8.1) - Main framework with SSG 
- **Svelte** - Interactive components (search, theme toggle, display settings)
- **Tailwind CSS** - Styling with typography plugin
- **TypeScript** - Full type safety
- **Biome** - Linting and formatting (tab indentation, double quotes)

### Key Architectural Patterns

**Configuration-Driven Design**: 
- `src/config.ts` - Central site configuration (theme, profile, navigation)
- Configuration is injected into components via `ConfigCarrier.astro`

**Content Management**:
- `src/content/posts/` - Blog posts with Astro content collections
- Frontmatter schema defined in `src/content/config.ts`
- Posts support: title, published date, tags, categories, draft status, i18n

**Plugin Architecture**:
- Custom Remark/Rehype plugins in `src/plugins/`
- GitHub admonitions, reading time, excerpts, KaTeX math
- Custom directive processing for enhanced markdown features

**Internationalization**:
- `src/i18n/` - Translation system supporting 7 languages
- Language-specific content via `lang` frontmatter field
- Automatic language detection and fallbacks

**Layout System**:
- `src/layouts/Layout.astro` - Base layout with theme management
- `src/layouts/MainGridLayout.astro` - Grid-based content layout
- Dynamic banner height and theme color CSS variables

**Component Architecture**:
- Astro components for static content (PostCard, Navbar, Footer)
- Svelte components for interactive features (Search, LightDarkSwitch)
- Widget system in `src/components/widget/` for sidebar content

### Search & Navigation
- **Pagefind** integration for static site search (built during production)
- Archive page with dynamic filtering capabilities
- Table of contents (TOC) generation with configurable depth
  - TOC navigation uses instant scrolling (no smooth scroll animation)
  - Implemented via custom scroll behavior override in `handleAnchorClick`
- Smooth page transitions via Swup

### Build Pipeline
- Production build includes Pagefind indexing
- Image optimization with Sharp
- Custom Rollup configuration for warning suppression
- Vercel deployment ready (empty vercel.json indicates defaults)

### Content Creation Workflow
1. Run `pnpm new-post <name>` to generate post template
2. Edit markdown in `src/content/posts/`
3. Use frontmatter schema: title, published, description, image, tags, category, draft, lang
4. Images can be co-located with posts in subdirectories

### Styling Approach
- Tailwind utilities with custom CSS variables for theming
- Stylus preprocessing for complex styles
- Component-specific CSS in individual files
- Dark/light mode with theme color customization (hue-based)

### Performance Optimizations
- Static site generation with minimal JavaScript
- Component-level code splitting
- Optimized image loading
- Search indexing at build time rather than client-side
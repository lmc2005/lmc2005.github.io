# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with **Hexo** (v7.3.0), a fast static site generator powered by Node.js. The blog is deployed to GitHub Pages at `lmc2005.github.io` and uses the **NexT theme** (v8.26.0) with the Gemini scheme.

## Common Commands

```bash
# Development
npm run server          # Start local dev server at http://localhost:4000

# Building
npm run build          # Generate static files (hexo generate)
npm run clean          # Clear cache and generated files (hexo clean)

# Deployment
npm run deploy         # Deploy to GitHub Pages (git@github.com:lmc2005/lmc2005.github.io.git)

# Content Creation
hexo new post "Title"           # Create new blog post
hexo new page "Page Name"       # Create new page
hexo new draft "Draft Title"    # Create draft
hexo publish draft "Title"      # Publish draft to post
```

## Architecture

### Directory Structure

```
blog/
├── source/                     # Source content directory
│   ├── _posts/                # Blog posts (organized by category subdirectories)
│   ├── _drafts/               # Draft posts
│   ├── tags/                  # Tag pages (auto-generated)
│   └── categories/            # Category pages (auto-generated)
├── themes/next/                # NexT theme (v8.26.0, scheme: Gemini)
├── public/                     # Generated static site (output of hexo generate)
├── scaffolds/                  # Post templates (post.md, page.md, draft.md)
├── _config.yml                 # Main Hexo configuration
└── themes/next/_config.yml     # NexT theme configuration
```

### Content Organization

- **Blog posts** are stored in `source/_posts/` and can be organized by category into subdirectories (e.g., `OperatorSystem/`, `llm/`, `chart/`)
- **Post format**: Markdown with frontmatter containing title, date, and tags
- **URL structure**: `:year/:month/:day/:title/` (configured in `_config.yml:17`)
- **Post assets**: When `post_asset_folder: true` is enabled (configured in `_config.yml:43`), assets for a post should be placed in a folder with the same name as the post file
- **Drafts**: Stored in `source/_drafts/`, not rendered unless `render_drafts: true` is set

### Configuration Files

- **`_config.yml`**: Main Hexo configuration (site metadata, URL structure, theme selection, deployment)
- **`themes/next/_config.yml`**: NexT theme settings (scheme, menu, styling, plugins)
- **`scaffolds/post.md`**: Template for new blog posts with default frontmatter (title, date, tags)
- **`scaffolds/page.md`**: Template for new pages
- **`scaffolds/draft.md`**: Template for drafts

### Key Dependencies

- `hexo-renderer-marked`: Markdown rendering
- `hexo-renderer-ejs`: Template rendering
- `hexo-renderer-stylus`: CSS preprocessing
- `hexo-deployer-git`: Git-based deployment
- `hexo-server`: Local development server

## Development Workflow

1. Create new content: `hexo new post "Post Title"`
2. Edit the generated Markdown file in `source/_posts/`
3. Preview locally: `npm run server` (opens at http://localhost:4000)
4. Build production files: `npm run build` (generates to `public/` directory)
5. Deploy: `npm run deploy` (pushes to `lmc2005.github.io` repo, branch: main)

**Important file locations:**
- Custom head: `source/_data/head.njk` (referenced in `themes/next/_config.yml:22`)
- Generated site: `public/` directory (DO NOT edit directly, will be overwritten)
- Theme static assets: `themes/next/source/`

## Theme Customization

The blog uses **NexT theme** with the **Gemini scheme**. For theme customization:

1. **Alternate Theme Config**: Create `source/_data/next.yml` to override theme settings without modifying `themes/next/_config.yml` directly (prevents merge conflicts during theme updates)
2. **Custom files**: Can be added in `source/_data/` for custom head, header, sidebar, footer, and styles (see `custom_file_path` in `themes/next/_config.yml`)
3. **Current scheme**: Gemini (defined in `themes/next/_config.yml:43`)

## Deployment

- **Type**: Git deployer
- **Repository**: `git@github.com:lmc2005/lmc2005.github.io.git`
- **Branch**: `main`
- **Command**: `npm run deploy` (runs `hexo deploy`)
- **Full deployment workflow**: `npm run clean && npm run build && npm run deploy`

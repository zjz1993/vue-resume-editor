# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 resume editor application built with TypeScript, Vite, and Tailwind CSS. The project is in early development stages and uses modern Vue patterns with the Composition API and `<script setup>` syntax.

## Development Commands

```bash
# Start development server
npm start

# Build for production (includes TypeScript compilation)
npm run build

# Preview production build locally
npm run preview

# TypeScript type checking only
npx vue-tsc -b
```

## Technology Stack

- **Vue 3.5.25** with Composition API and `<script setup>` syntax
- **TypeScript** with strict mode enabled
- **Vite 7.3.1** for build tooling and development server
- **Tailwind CSS 4.2.1** with the new `@theme` configuration syntax
- **Element Plus 2.13.5** as the UI component library
- **Vue Router 5.0.3** for routing (installed but not yet configured)

## Architecture & Project Structure

### Entry Points
- **`main.ts`**: Application bootstrap, imports Element Plus globally
- **`App.vue`**: Root component with responsive layout logic
- **`index.html`**: HTML entry point

### Component Organization
- **`src/components/`**: Vue components using `<script setup lang="ts">` syntax
- **`Header.vue`**: Application header with export PDF button (placeholder)
- **Responsive Layout**: Mobile-first approach with Element Plus tabs on mobile, grid layout on desktop

### Styling Architecture
- **Tailwind CSS v4** with new `@theme` syntax in `src/style.css`
- **Design tokens**: CSS custom properties for colors (`--color-card`, `--color-border`)
- **Element Plus**: Full component library with global CSS import
- **Utility classes**: Responsive breakpoints (sm, md, lg) for adaptive layouts

### TypeScript Configuration
- **Project references** setup with separate configs for app and node environments
- **Strict mode** enabled with additional linting rules
- **No unused locals/parameters** enforced
- **Build info**: Stored in `node_modules/.tmp/` for faster rebuilds

## Code Patterns & Conventions

### Vue Components
- Use `<script setup lang="ts">` syntax for all components
- Import components with `.vue` extensions
- Use `ref()` from Vue for reactive state
- Element Plus components are globally available (e.g., `el-button`, `el-tabs`)

### Styling
- Use Tailwind utility classes over custom CSS
- Follow mobile-first responsive design
- Leverage Element Plus components with Tailwind customization
- Use CSS custom properties for theming values

### Type Safety
- Always type props and reactive references
- Enable TypeScript strict mode rules
- Use `noUnusedLocals` and `noUnusedParameters` to catch unused code

## Current Implementation Status

### Completed
- Vue 3 + TypeScript + Vite setup
- Tailwind CSS 4 integration
- Element Plus UI library integration
- Responsive layout foundation
- Basic component structure

### Placeholder Features
- **Resume editing functionality**: Main feature not yet implemented
- **PDF export**: Button exists but functionality is placeholder
- **Routing**: Vue Router installed but no routes configured
- **State management**: No centralized state management (consider Pinia for future needs)

## Development Notes

- The project uses Element Plus components globally - no need to import individual components
- Tailwind CSS 4 uses the new `@theme` syntax instead of `tailwind.config.js`
- TypeScript compilation is integrated into the build process via `vue-tsc -b && vite build`
- The app uses responsive design with separate layouts for mobile (tabs) and desktop (grid)
- All components use the modern Vue 3 Composition API with `<script setup>`
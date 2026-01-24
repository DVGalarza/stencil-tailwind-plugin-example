# AGENTS.md - AI Agent Development Guide

This document provides essential context for AI coding agents working on this repository.

## Project Overview

This is a **Stencil JS component library** that demonstrates the integration of Stencil with Tailwind CSS using the `stencil-tailwind-plugin`. The project showcases web components built with modern tooling and is designed for rapid prototyping and component development using Storybook.

### Tech Stack

- **Framework**: StencilJS 4.x (Web Components compiler)
- **Styling**: Tailwind CSS (via stencil-tailwind-plugin)
- **CSS Preprocessor**: Sass
- **Development**: Storybook 8.x (component development environment)
- **Testing**: Jest + Puppeteer (spec and e2e tests)
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Type System**: TypeScript

## Project Structure

```
/src/
  ├── components/          # Web component definitions
  │   ├── demo-card/       # Example card component
  │   ├── demo-section/    # Demo section component
  │   ├── footer-nav/      # Footer navigation
  │   ├── hero-section/    # Hero section component
  │   ├── main-app/        # Main application component (example)
  │   ├── top-nav-bar/     # Top navigation bar
  │   └── internal/        # Internal/utility components (Badge, Link)
  ├── styles/              # Global styles
  │   └── tailwind.css     # Tailwind CSS entry point
  ├── postcss/             # PostCSS plugins
  └── index.ts             # Library entry point

/docs/                     # Built www output for GitHub Pages
/loader/                   # Component loaders for CDN usage
/dist/                     # Distribution builds (not in git)
```

## Key Configuration Files

- **stencil.config.ts**: Stencil compiler configuration with Tailwind plugin
- **postcss.config.js**: PostCSS configuration
- **tsconfig.json**: TypeScript configuration
- **eslint.config.mjs**: ESLint configuration
- **.storybook/**: Storybook configuration files

## Component Architecture

### Component Structure

Each Stencil component follows this pattern:

```typescript
import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,  // Uses Shadow DOM for style encapsulation
})
export class MyComponent {
  @Prop() propName: string;
  @State() stateName: boolean;
  @Event() eventName: EventEmitter;

  render() {
    return <div>JSX content</div>;
  }
}
```

### Reactive Data & State Management

Stencil components use decorators for reactive data handling:

**@Prop()** - Properties passed from parent components (immutable within component)

```typescript
@Prop() name: string;
@Prop() count: number = 0;  // with default
```

**@State()** - Internal component state (triggers re-render when changed)

```typescript
@State() isOpen: boolean = false;
```

**@Watch()** - Lifecycle hook that fires when a prop or state changes

```typescript
@Prop() userId: string;

@Watch('userId')
handleUserIdChange(newValue: string, oldValue: string) {
  console.log(`userId changed from ${oldValue} to ${newValue}`);
  // Perform side effects, fetch data, update other state, etc.
}
```

**Key patterns:**

- `@Watch` runs after the first render and on every subsequent change
- Use `@Watch` for side effects like API calls, validation, or derived state updates
- Multiple `@Watch` decorators can observe the same property
- Prop and State changes automatically trigger re-renders
- Always mutate `@State` properties immutably (create new objects/arrays)

```typescript
// ❌ Wrong - mutating state directly
this.items.push(newItem);

// ✅ Correct - creating new array
this.items = [...this.items, newItem];
```

More details: [Stencil Reactive Data](https://stenciljs.com/docs/reactive-data)

## Development Workflow

### Common Commands

```bash
# Install dependencies
pnpm install

# Start Storybook development server
pnpm start                # Alias for pnpm storybook
pnpm storybook           # Runs on http://localhost:6006

# Build components
pnpm build               # Builds all output targets + docs

# Run tests
pnpm test                # Run all tests
pnpm test.watch          # Watch mode

# Generate new component
pnpm generate            # Interactive component generator

# Linting & Formatting
pnpm lint                # Check for lint errors
pnpm lint:fix            # Auto-fix lint errors
pnpm format              # Format code with Prettier
pnpm format:check        # Check formatting

# Build Storybook for deployment
pnpm build-storybook
```

### Creating New Components

1. Use the generator: `pnpm generate`
2. Follow the prompt to create component scaffolding
3. Implement component logic in `.tsx` file
4. Add Tailwind classes in `.css` file
5. Create Storybook story in `.stories.tsx`
6. Add tests in `.spec.ts` and `.e2e.ts`

## Tailwind CSS Integration

This project uses `stencil-tailwind-plugin` which:

- Processes Tailwind directives in component CSS files
- Enables Shadow DOM compatibility
- Supports hot module replacement (HMR)

### Configuration

```typescript
// stencil.config.ts
setPluginConfigurationDefaults({
  enableDebug: false,
  tailwindCssPath: './src/styles/tailwind.css',
});
```

### Using Tailwind in Components

Component CSS files can use Tailwind's `@apply` directive and utility classes:

```css
/* component-name.css */
.container {
  @apply flex items-center justify-center;
}
```

## Storybook Integration

Storybook is the primary development environment for this component library.

### Writing Stories

```typescript
// component-name.stories.tsx
import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/ComponentName',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => '<component-name></component-name>',
};
```

### Workflow

1. Build components first: `pnpm build`
2. Start Storybook: `pnpm storybook`
3. Develop components in isolation
4. Document component APIs and variants

## Output Targets

The project generates multiple distribution formats:

1. **dist**: Standard distribution with ES modules
2. **dist-custom-elements**: Custom elements bundle (auto-define)
3. **docs-readme**: Auto-generated component documentation
4. **docs-json**: Custom elements manifest (custom-elements.json)
5. **www**: Static site output (docs/ directory)
6. **loader**: CDN-friendly loaders

## Testing Strategy

- **Unit Tests** (`.spec.ts`): Test component logic and rendering
- **E2E Tests** (`.e2e.ts`): Test component behavior in real browser (Puppeteer)
- Tests run with `pnpm test`

## Important Notes for Agents

### DO's

✅ **Use pnpm** - This project uses pnpm as the package manager
✅ **Build before Storybook** - Run `pnpm build` before starting Storybook
✅ **Follow component structure** - Keep consistent file organization
✅ **Use Shadow DOM** - Components may use `shadow: true` for encapsulation, when it does not depend on any global styles or customization
✅ **Add Storybook stories** - New components should include stories
✅ **Write tests** - Include both spec and e2e tests
✅ **Use Tailwind utilities** - Leverage Tailwind for styling
✅ **Update documentation** - Component READMEs auto-generate from JSDoc comments on build

### DON'Ts

❌ **Don't use npm/yarn** - Use pnpm commands only
❌ **Don't modify dist/docs** - These are build outputs
❌ **Don't skip linting** - Code must pass ESLint and Prettier checks
❌ **Don't hardcode styles** - Use Tailwind utility classes and design tokens
❌ **Don't skip building** - Storybook needs built components

### Code Style

- **Formatting**: Prettier (auto-formats on commit via husky)
- **Linting**: ESLint with Stencil plugin
- **TypeScript**: Strict mode enabled
- **Naming**: kebab-case for component tags, PascalCase for classes

## Main Application Component

The `main-app` component serves as an example application that composes other components:

```tsx
<main-app>
  <top-nav-bar />
  <hero-section />
  <demo-section />
  <footer-nav />
</main-app>
```

This demonstrates component composition and can be used as a reference for building full pages.

## Dependencies

### Production

- `@stencil/core`: Web Components compiler

### Development

- `stencil-tailwind-plugin`: Tailwind CSS integration
- `@stencil/sass`: Sass preprocessing
- `@storybook/*`: Component development environment
- Testing: Jest, Puppeteer, Testing Library
- Linting: ESLint, Prettier
- Git hooks: Husky, lint-staged

## Debugging Tips

1. **Storybook not showing components**: Ensure `pnpm build` was run first
2. **Styles not applying**: Check Shadow DOM encapsulation and Tailwind config
3. **HMR not working**: Restart Storybook dev server
4. **Build errors**: Check TypeScript and ESLint errors first
5. **Component not registering**: Verify component is exported in index.ts

## Publishing & Distribution

The built components can be:

- Published to npm as a package
- Used via CDN (unpkg/jsdelivr) with the loader
- Distributed as custom elements
- Embedded in any framework (React, Vue, Angular, vanilla JS)

## Additional Resources

- [Stencil Documentation](https://stenciljs.com/)
- [Storybook Documentation](https://storybook.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [stencil-tailwind-plugin](https://github.com/Poimen/stencil-tailwind-plugin)

## Version Info

- Node.js: Check `.nvmrc` or package.json engines field
- pnpm: 10.27.0 (specified in packageManager field)

---

_This document should be updated as the project evolves. When making significant architectural changes, please update this guide accordingly._

# Nextjs E-Commerce Shop

A full-stack e-commerce application built with Next.js App Router, TypeScript, and Tailwind CSS.

## Project Structure

This project follows modern Next.js 14+ best practices for structuring a large-scale application:

```
my-nextjs-project/
│
├── src/                      # Source files
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/           # Auth route group
│   │   ├── products/         # Products routes
│   │   │   ├── [id]/         # Dynamic product routes
│   │   ├── api/              # API routes
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │
│   ├── components/           # UI Components
│   │   ├── ui/               # Generic UI components
│   │   │   ├── buttons/      # Button components
│   │   │   ├── cards/        # Card components
│   │   │   ├── inputs/       # Input components
│   │   │   ├── modals/       # Modal components
│   │   ├── forms/            # Form components
│   │   ├── layouts/          # Layout components
│   │   ├── common/           # Common components
│   │
│   ├── config/               # Configuration
│   │   ├── constants/        # App constants
│   │
│   ├── lib/                  # Library code
│   │   ├── utils/            # Utility functions
│   │   ├── hooks/            # Custom hooks
│   │   ├── transitions/      # Transition animations
│   │
│   ├── contexts/             # React context providers
│   ├── hooks/                # Application hooks
│   ├── services/             # External services
│   ├── store/                # State management
│   ├── styles/               # Global styles
│   ├── types/                # TypeScript types
│
├── public/                   # Static files
├── next.config.mjs           # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
```

This structure follows best practices for large-scale Next.js applications with the App Router, ensuring:

- Logical organization of components
- Clear separation of concerns
- Optimized for code reuse and maintainability
- Better team collaboration
- Improved discoverability
- Scalability for future growth

## Atomic Design Structure

The components follow atomic design principles:

1. **Atoms**: Basic UI building blocks (Button, Input, NavLink)
2. **Molecules**: Combinations of atoms (AppHeader, FormGroup, Card)
3. **Organisms**: Complex UI sections (Header, ProductList, Checkout)
4. **Templates**: Page-level structures (MainLayout, ProductLayout)
5. **Pages**: Specific instances combining templates with data (app/page.js)

## Key Features

- Server-side rendering and static site generation
- Dynamic routing with App Router
- Global state management with Redux
- Data fetching with React Query
- Styling with Tailwind CSS
- Dark mode support
- TypeScript for type safety

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

## Component Generation

Generate new components following atomic design principles:

```bash
# Usage: npm run gen:component <component-type> <component-name>
npm run gen:component atoms Button
npm run gen:component molecules FormGroup
npm run gen:component organisms ProductCard
npm run gen:component templates AccountLayout
```

## Best Practices

1. **Folder Structure**: Route folders mirror the URL structure
2. **Component Organization**: Follow atomic design principles
3. **Data Fetching**: Use React Query for client-side data fetching
4. **Styling**: Use Tailwind CSS for utility-first styling
5. **TypeScript**: Type all components and functions
6. **Testing**: Write tests for components and utilities

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `rigin feature/my-feature`
5. Submit a pull request

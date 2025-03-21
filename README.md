# React Shop

A modern e-commerce application built with React and TypeScript.

## Features

- React 18 with TypeScript
- Redux Toolkit with typed state and actions
- RESTful API integration with type-safe API layer
- Responsive design with Tailwind CSS
- Automated testing with Playwright

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/khakiiman/react-e-commerce.git
cd react-shop
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

## TypeScript Support

This project uses TypeScript for strong typing and better development experience. Key type definitions include:

- API Schema types (`src/types/api.ts`)
- Redux Store types (`src/types/store.ts`)
- React component prop types
- Custom hook return types (`src/types/hooks.ts`)

To run type checking:
```bash
npm run typecheck
# or
yarn typecheck
```

## Testing

This project uses Playwright for end-to-end testing. Run tests with:

```bash
npm run test
# or
yarn test
```

For interactive test UI:
```bash
npm run test:ui
# or
yarn test:ui
```

## Folder Structure

```
src/
├── assets/       # Static assets like images and icons
├── components/   # Reusable React components
├── constants/    # Application constants and configuration
├── contexts/     # React contexts
├── hooks/        # Custom React hooks
├── layout/       # Layout components
├── middleware/   # API middleware and adapters
├── pages/        # Page components
├── scripts/      # Utility scripts
├── services/     # API services
├── store/        # Redux store and slices
├── tests/        # Test files
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## License

MIT

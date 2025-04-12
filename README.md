# Your Digital Swiss Army Knife

A versatile collection of web tools designed to simplify your digital life and help you with everyday tasks. Powerful, user-friendly, and privacy-focused — all in one place, all for free, with no sign-up required.

## Development

### Prerequisites

- [Node.js](https://nodejs.org) (v22.14.0 or higher)
- [Bun](https://bun.sh) (v1.2.8 or higher)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/swiss.git
    cd swiss
    ```

2. Install dependencies:
    ```bash
    bun install
    ```

### Available Scripts

- **Development server**:

    ```bash
    bun run dev
    ```

    Starts the development server at `http://localhost:4321`

- **Build for production**:

    ```bash
    bun run build
    ```

    Creates an optimized production build in the `dist` directory

- **Preview production build**:

    ```bash
    bun run preview
    ```

    Serves the production build locally for testing

- **Format code**:

    ```bash
    bun run format
    ```

    Runs Prettier to format all code files

- **Lint**:

    ```bash
    bun run lint
    ```

    Runs Astro's built-in linting

- **Add UI components**:
    ```bash
    bun run shadcn add [component-name]
    ```
    Adds shadcn/ui components to your project

## License

[MIT](LICENSE)

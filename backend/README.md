# Shopping List Backend

Backend API built with Bun, Express, TypeScript, and MongoDB.

## Prerequisites

- [Bun](https://bun.sh/) installed (for local development)
- [Docker](https://www.docker.com/) and Docker Compose (for containerized development)

## Getting Started

### Using Docker Compose (Recommended)

1. Start the services:
```bash
docker-compose up
```

2. The API will be available at `http://localhost:3000`

3. Stop the services:
```bash
docker-compose down
```

### Local Development

1. Install dependencies:
```bash
bun install
```

2. Make sure MongoDB is running locally or update the `.env` file with your MongoDB connection string.

3. Start the development server:
```bash
bun run dev
```

4. The API will be available at `http://localhost:3000`

## Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run start` - Start production server

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api` - API info endpoint

## Environment Variables

See `.env.example` for available environment variables.

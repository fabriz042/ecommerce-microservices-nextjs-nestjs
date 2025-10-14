# Ecommerce Fullstack Application

This project is a fullstack ecommerce application built using Next.js for the frontend and NestJS for the backend. It is designed with a microservices architecture to ensure scalability and maintainability.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v20 or higher)
- Docker and Docker Compose
- pnpm (Package Manager)

## Setup Instructions

### 1. Clone the Repository

```bash
# Clone the repository to your local machine
git clone https://github.com/fabriz042/ecommerce-microservices-nextjs-nestjs.git
cd ecommerce-microservices-nextjs-nestjs
```

### 2. Install Dependencies

```bash
# Install dependencies for all packages
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the required environment variables. Refer to the `.env.example` file for guidance.

### 4. Start the Services

#### Using Docker Compose

```bash
# Start all services using Docker Compose
docker-compose -f docker-compose.local.yml up -d
```

#### Running Locally

For development, you can start the services using the following commands:

- **Run All Services (Backend+Frontend)**:

  ```bash
  pnpm dev-all
  ```

- **Frontend Only**:

  ```bash
  pnpm dev:frontend
  ```

- **Backend (API Gateway and Microservices)**:

  ```bash
  pnpm dev:backend
  ```

### 5. Access the Application

- Frontend: [http://localhost:3000](http://localhost:3000)
- API Gateway: [http://localhost:3001](http://localhost:3001)

## Project Structure

- `apps/`
  - `frontend/`: Next.js application for the frontend.
  - `api-gateway/`: NestJS application acting as the API Gateway.
  - `ms-auth/`: Microservice for user management and authentication (coming soon).
  - `ms-chatbot/`: Microservice for integration with AI MCP and the catalog (coming soon).
  - `ms-catalog/`: Microservice for managing product catalog.
  - `ms-orders/`: Microservice for managing orders.
- `packages/`
  - `shared/`: Shared libraries and utilities.

## Additional Notes

- Ensure Docker is running before starting the services.
- Use `pnpm` for managing dependencies to maintain consistency across the monorepo.

## License

This project is licensed under the MIT License.

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "SecureTask API",
    version: "1.0.0",
    description: "SecureTask Backend API Documentation",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    "/api/v1/auth/register": {
      post: {
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "User registered successfully" },
        },
      },
    },
    "/api/v1/auth/login": {
      post: {
        summary: "Login user",
        responses: {
          200: { description: "Login successful" },
        },
      },
    },
    "/api/v1/tasks": {
      get: {
        summary: "Get paginated tasks",
        security: [{ bearerAuth: [] }],
      },
      post: {
        summary: "Create task",
        security: [{ bearerAuth: [] }],
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RestoCRM API",
      version: "1.0.0",
      description: "API documentation for RestoCRM",
    },
  },
  apis: ["./src/routes/*.js"], 
};

export const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log("📄 Swagger docs available at http://localhost:5001/api-docs");
}

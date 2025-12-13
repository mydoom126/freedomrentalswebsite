import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { handleBookConsultationSubmission } from "./routes/bookConsultation";

// Create Express app
export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Parse URL-encoded bodies (for form data)
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "property-management-api",
    });
  });

  // Demo API endpoint
  app.get("/api/demo", (req: Request, res: Response) => {
    res.json({
      message: "Hello from Property Management API!",
      version: "1.0.0",
    });
  });

  // Book consultation submission
  app.post("/api/book-consultation", handleBookConsultationSubmission);

  // Add more API routes here as needed
  // app.use('/api/properties', propertyRoutes);
  // app.use('/api/tenants', tenantRoutes);

  return app;
}

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import cors from "cors";
const app = express();
const httpServer = createServer(app);

//cors setup
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods:["GET","POST", "PUT", "DELETE"],
  credentials:true
}))
// server/index.ts

app.use((_req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://checkout.razorpay.com https://api.razorpay.com; " +
    "worker-src 'self' blob:; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com; " +
    "connect-src 'self' ws://localhost:5000 http://localhost:5000 ws://127.0.0.1:5000 http://127.0.0.1:5000 http://localhost:5173 ws://localhost:5173;"
  );
  next();
});
// 3. Body Parsers
app.use(express.json());
declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    console.log("Connecting to database...");
    await registerRoutes(httpServer, app);
  } catch (err) {
    console.error("Error registering routes:", err);
  }

  // 2. ERROR HANDLING MIDDLEWARE (Keep this here)
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);
    if (res.headersSent) return next(err);
    return res.status(status).json({ message });
  });

  // 3. THE MISSING LINK: Tell Express to use Vite for the frontend
  if (app.get("env") === "development") {
    const { setupVite } = await import("./vite"); // Imports your vite.ts
    await setupVite(httpServer, app);             // Starts the Vite engine
  } else {
    serveStatic(app);
  }
// 4. Start the server
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(port, () => {
    console.log(`Server started at port: ${port}`);
    console.log(`Visit: http://127.0.0.1:${port}`);
  });
})();

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
 

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
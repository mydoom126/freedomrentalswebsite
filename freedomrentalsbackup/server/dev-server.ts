import { createServer } from "./index";

const port = Number(process.env.PORT || 8888);

const app = createServer();

app.listen(port, () => {
  console.log(`Dev API server listening on http://localhost:${port}`);
});

process.on("SIGINT", () => process.exit(0));

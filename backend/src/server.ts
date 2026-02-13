import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/products", async (_req, res) => {
  const filePath = path.join(__dirname, "../../frontend/products.json");
  const data = await readFile(filePath, "utf-8");
  res.json(JSON.parse(data));
});

const frontendDist = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendDist));
app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

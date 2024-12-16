import express from "express";
import "./config/db.js";
import authRouter from "./routes/authRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import cardRouter from "./routes/cardRoute.js";
import { fileURLToPath } from "url";
import path from "path";

const PORT = 3000;
const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", cardRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

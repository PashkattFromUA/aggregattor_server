import express from "express";
import "./config/db.js";
import authRouter from "./routes/authRoute.js";
import categoryRouter from "./routes/categoryRoute.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/api", authRouter);
app.use("/api", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

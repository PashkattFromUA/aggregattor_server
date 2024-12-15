import mongoose from "mongoose";
import { DB_URI } from "../credits";

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error(e);
  });

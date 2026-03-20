//router controlle
import express from "express";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/notes", noteRoutes);

export default app;

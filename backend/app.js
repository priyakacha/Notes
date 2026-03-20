//router controlle
import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/notes", noteRoutes);

export default app;

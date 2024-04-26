import express from "express";
import { DownloadController } from "../controllers/index.js";

const clipsaveTwitterRouter = express.Router();

clipsaveTwitterRouter.post("/twitter", DownloadController.analyze);

export { clipsaveTwitterRouter };

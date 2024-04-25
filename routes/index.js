import express from "express";
import { analyze } from "../controllers";

const clipsaveTwitterRouter = express.Router();

clipsaveTwitterRouter.use("/download", analyze);

export { clipsaveTwitterRouter };

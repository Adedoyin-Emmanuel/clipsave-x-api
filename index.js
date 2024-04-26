import "express-async-errors";
import { errorHandler } from "./middlewares/errors.js";
import { notFound } from "./middlewares/notFound.js";
import { clipsaveTwitterRouter } from "./routes/index.js";
import express from "express";
const PORT = process.env.PORT || 2800;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Welcome to Clipsave API" });
});

app.use("/api/downloader", clipsaveTwitterRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
});

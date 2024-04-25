import "express-async-errors";
import { errorHandler } from "./middlewares/errors";
import { notFound } from "./middlewares/notFound";
import { clipsaveTwitterRouter } from "./routes";
import express from "express";
const PORT = process.env.PORT || 2800;

const app = express();

app.use("/api", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Welcome to Clipsave API" });
});

app.use("/api/twitter", clipsaveTwitterRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
});

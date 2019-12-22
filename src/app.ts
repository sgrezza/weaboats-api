import express from "express";
import helmet from "helmet";
import {
  getDrops,
  getStats,
  getRarities,
  getSkills,
  getMisc
} from "./connections/mongodb";
import logger from "./logger";
import apiCacheA from "apicache";
const app = express();
const apiCacheMiddleware = apiCacheA.options({
  debug: process.env.NODE_ENV === undefined ? true : false
}).middleware;
app.use(apiCacheMiddleware("1 day"));
app.use(helmet());
app.get("/", (req, res) => {
  res.status(200).send("Hi.");
});

app.get("/rarities", async (req, res) => {
  try {
    res.set("content-type", "application/json");

    const conn = await getRarities();
    logger.info("Request for names");

    return res.json(conn);
  } catch (e) {
    logger.error(e.message);
    res.status(500).send("Server Error");
  }
});
app.get("/drops/:name", async (req, res: any) => {
  const { name } = req.params;
  if (name === undefined) {
    return res.status(404).send("Ship not provided or not found");
  }

  const result = await getDrops(name);
  logger.info("Request for drops.");
  return res.send(result);
});

app.get("/stats/:name", async (req, res) => {
  const { name } = req.params;

  const result = await getStats(name);
  logger.info("Request for stats.");
  return res.send(result);
});
app.get("/skills/:name", async (req, res) => {
  const { name } = req.params;
  const result = await getSkills(name);
  logger.info("Request for skills.");
  return res.send(result);
});
app.get("/misc/:name", async (req, res) => {
  const { name } = req.params;
  return res.send(await getMisc(name));
});
// const server = createTerminus(app)
export default app;

import express from "express";
import helmet from "helmet";
import { getDrops, getStats, getRarities, getSkills } from "./connections/mongodb";
import logger from "./logger";
import { askCache, apiCache } from "./cache";
const app = express();

app.use(helmet());
app.get("/", (req, res) => {
  res.status(200).send("Hi.");
});

app.get("/rarities", async (req, res) => {
  try {
    res.set("content-type", "application/json");

    const cached = apiCache.get<string>("rarities");
    if (cached !== undefined) {
      logger.info("Read rarities from cache.");
      return res.json(JSON.parse(cached));
    }

    const conn = await getRarities();
    logger.info("Request for names");

    res.json(conn);
    return apiCache.set("rarities", JSON.stringify(conn));
  } catch (e) {
    logger.error(e.message);
    res.status(500).send("Server Error");
  }
});
app.use(askCache);
app.get("/drops/:name", async (req, res: any) => {
  const { name } = req.params;
  if (name === undefined) {
    return res.status(404).send("Ship not provided or not found");
  }

  const result = await getDrops(name);
  logger.info("Request for drops.");
  res.send(result);
  return apiCache.set(`${name}.drops`, JSON.stringify(result));
});

app.get("/stats/:name", async (req, res) => {
  const { name } = req.params;

  const result = await getStats(name);
  logger.info("Request for stats.");
  res.send(result);
  return apiCache.set(`${name}.stats`, JSON.stringify(result));
});
app.get("/skills/:name", async (req, res) => {
  const { name } = req.params;
  const result = await getSkills(name);
  logger.info("Request for skills.");
  res.send(result);
  return apiCache.set(`${name}.skills`, JSON.stringify(result));
});
// const server = createTerminus(app)
export default app;

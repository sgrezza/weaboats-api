import express from "express";
import helmet from "helmet";
import {
  getDrops,
  getStats,
  getRarities,
  getSkills
} from "./connections/mongodb";
import logger from "./logger";
import apiCacheA from "apicache";
const app = express();
const apiCacheMiddleware = apiCacheA.options({
  statusCodes: {
    include: [200]
  }
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
    return res.status(500).send("Server Error");
  }
});
app.get("/drops/:name", async (req, res: any) => {
  const { name } = req.params;
  if (name === undefined) {
    return res.status(404).send("Ship not provided or not found");
  }
  try {
    const result = await getDrops(name);
    logger.info("Request for drops.");
    if (!result || result.length === 0) {
      throw `${new Date().toLocaleString()} - Error getting stats for ${name}`;
    }
    return res.send(result);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Server Error");
  }
});

app.get("/stats/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const result = await getStats(name);
    logger.info("Request for stats.");
    if (!result || result.length === 0) {
      throw `${new Date().toLocaleString()} - Error getting stats for ${name}`;
    }
    return res.send(result);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Server Error");
  }
});
app.get("/skills/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const result = await getSkills(name);
    logger.info("Request for skills.");
    if (!result || result.length === 0) {
      throw `${new Date().toLocaleString()} - Error getting skills for ${name}`;
    }
    return res.status(200).send(result);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Server Error");
  }
});

const nut = (req, res, next) => {
  console.log("nut");
  return next();
};
app.use(nut);

export default app;

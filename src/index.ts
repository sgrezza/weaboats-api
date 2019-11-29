import express from "express";
import client, { getDrops, getStats, getRarities } from "./connection";
import logger from "./logger";
const app = express();

app.get("/rarities", async (req: any, res: any) => {
  try {
    const conn = await getRarities();
    logger.info("Request for names");
    res.send(conn);
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
  res.send(result);
});
app.get("/stats/:name", async (req, res) => {
  const { name } = req.params;
  if (name === undefined) {
    return res.status(404).send("Ship not provided or not found");
  }
  const result = await getStats(name);
  logger.info("Request for stats.");
  res.send(result);
});
client.connect(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on ${process.env.PORT}`);
  });
});

process.on("SIGINT", () => {
  client.close();
  logger.info("MongoDB Client exited.");
  process.exit(0);
});

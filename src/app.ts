import express from "express";
import helmet from "helmet";
import { getRarities, status, get, getRetrofits } from "./connections/mongodb";
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
app.get("/", async (req, res) => {
  res.status(200).send(`Hi.
Everything cool? ${await status()} `);
});
app.use((req, res, next) => {
  res.set("content-type", "application/json");
  next();
});

app.get("/rarities", async (req, res) => {
  try {
    logger.info("Request for names");
    return res.json(await getRarities());
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send("Server Error");
  }
});
app.get("/retrofits", async (req, res) => {
  try {
    logger.info("Request for names");

    return res.json(await getRetrofits());
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send("Server Error");
  }
});
app.get("/:intent/:name", async (req, res) => {
  const { intent, name } = req.params;
  if (intent === undefined || name === undefined) {
    return res.sendStatus(400).send("Error.");
  }
  try {
    let response;
    switch (
      intent // Make sure 'intent' is a valid endpoint
    ) {
      case "drops":
      case "stats":
      case "skills":
      case "skins":
        response = await get(intent, name);
        break;
      default:
        response = "Error. Endpoint not found.";
    }
    res.send(response);
  } catch (e) {
    return res.sendStatus(400).send(JSON.stringify(e));
  }
});
const nut = (req, res, next) => {
  console.log("nut");
  return next();
};
app.use(nut);

export default app;

import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../.env") });
import app from "./app";
import client from "./connections/mongodb";
import logger from "./logger";

let server;
client.connect(() => {
  server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on ${process.env.PORT || 3000}`);
  });
});
process.on("SIGINT", () => {
  client.close();
  logger.info("MongoDB Client exited.");
  server.close();
  logger.info("Express exited.");
  process.exit(0);
});

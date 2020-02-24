import { MongoClient } from "mongodb";
import {
  dropsProject,
  statsProject,
  raritiesProject,
  skillsProject,
  miscProject
} from "./schemas";
import logger from "../logger";
import { determineIfAvailable } from "./availability";
const uri = process.env.MONGODB_KEY || "";
export const client = new MongoClient(uri, {
  useNewUrlParser: true,
  ssl: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 1000
});
export const getDrops = async (name: string) => {
  logger.info(`Fetching drops for ${name}`);
  const ref = client.db("boats").collection("boats");
  return ref.findOne({ name }, { projection: dropsProject }).then(res => {
    const availability = determineIfAvailable(res, res.rarity);
    return { ...res, availability };
  });
};

export const getStats = async (name: string) => {
  logger.info(`Fetching stats for ${name}`);

  const ref = client.db("boats").collection("boats");
  return ref.findOne({ name }, { projection: statsProject });
};
export const getRarities = async () => {
  logger.info(`Fetching rarities`);

  const ref = client.db("boats").collection("boats");
  return ref
    .find({ rarity: { $ne: "Unreleased" } })
    .project(raritiesProject)
    .toArray();
};
export const getSkills = async (name: string) => {
  logger.info(`Fetching skills for ${name}`);
  const ref = client.db("boats").collection("boats");
  return ref.findOne({ name }, { projection: skillsProject });
};
export const getMisc = async name => {
  const ref = client.db("boats").collection("boats");
  return ref.findOne({ name }, { projection: miscProject });
};
export const getSkins = async name => {
  const ref = client.db("boats").collection("boats");
  return ref.findOne({ name }, { projection: { _id: 0, skins: 1 } });
};
export const status = () => {
  return client.isConnected();
};
export default client;

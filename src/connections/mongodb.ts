import { MongoClient, Collection } from "mongodb";
import {
  dropsProject,
  statsProject,
  raritiesProject,
  skillsProject,
} from "./schemas";
import logger from "../logger";
import { determineIfAvailable } from "./availability";
const uri = process.env.MONGODB_KEY || "";
export const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 500,
});
type Intent = "skins" | "stats" | "drops" | "skills";

const getRef = () => client.db("boats").collection("boats");

export const getDrops = async (ref: Collection<any>, name: string) => {
  return ref.findOne({ name }, { projection: dropsProject }).then((res) => {
    const availability = determineIfAvailable(res, res.rarity);
    return { ...res, availability };
  });
};

export const getStats = async (ref: Collection<any>, name: string) => {
  logger.info(`Fetching stats for ${name}`);
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
export const getSkills = async (ref: Collection<any>, name: string) => {
  logger.info(`Fetching skills for ${name}`);
  return ref.findOne({ name }, { projection: skillsProject });
};
export const getSkins = async (ref: Collection<any>, name: string) => {
  return ref.findOne({ name }, { projection: { _id: 0, skins: 1 } });
};
export const getRetrofits = async () => {
  const ref = getRef();
  return ref
    .find({ aaKai: { $exists: true } })
    .project(raritiesProject)
    .toArray();
};
export const status = () => {
  return client.isConnected();
};
const responser = {
  drops: getDrops,
  stats: getStats,
  skills: getSkills,
  skins: getSkins,
};
export const get = async (intent: Intent, name: string) => {
  const ref = getRef();
  return responser[intent](ref, name);
};
export default client;

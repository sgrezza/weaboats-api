import { MongoClient } from "mongodb";
import {
  dropsProject,
  statsProject,
  raritiesProject,
  skillsProject,
  miscProject
} from "./schemas";
import logger from "../logger";
const uri =
  "mongodb+srv://editor:tVbzQpHj03pLPthY@cluster0-vw3mj.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  ssl: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 1000
});
export const getDrops = async (name: string) => {
  logger.info(`Fetching drops for ${name}`);
  const ref = client.db("boats").collection("boats");
  return ref.findOne({ name }, { projection: dropsProject });
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
    .find({})
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
export default client;

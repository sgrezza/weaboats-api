import { MongoClient } from "mongodb";
import {
  dropsProject,
  statsProject,
  raritiesProject,
  skillsProject
} from "../schemas";
import logger from "../logger";
const uri =
  "mongodb+srv://editor:tVbzQpHj03pLPthY@cluster0-vw3mj.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  ssl: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 1000
});
const getDrops = async (name: string) => {
  logger.info(`Fetching drops for ${name}`);

  const ref = client.db("boats").collection("boats");
  return ref.findOne({ name }, { projection: dropsProject });
};
const getStats = async (name: string) => {
  logger.info(`Fetching stats for ${name}`);

  const ref = client.db("boats").collection("boats");
  return ref.findOne({ name }, { projection: statsProject });
};
const getRarities = async () => {
  logger.info(`Fetching rarities for ${name}`);

  const ref = client.db("boats").collection("boats");
  return ref
    .find({})
    .project(raritiesProject)
    .toArray();
};
const getSkills = async (name: string) => {
  logger.info(`Fetching skills for ${name}`);
  const ref = client.db("boats").collection("boats");
  return ref.findOne({ name }, { projection: skillsProject });
};
export { getStats, getDrops, getRarities, getSkills };
export default client;

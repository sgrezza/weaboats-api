import { MongoClient } from "mongodb";
import { dropsProject, statsProject, raritiesProject } from "./schemas";
const uri =
  "mongodb+srv://editor:tVbzQpHj03pLPthY@cluster0-vw3mj.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  ssl: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 1000
});
const getDrops = async (name: string) => {
  const ref = client.db("boats").collection("boats");
  return ref.findOne({ name }, { projection: dropsProject });
};
const getStats = async (name: string) => {
  const ref = client.db("boats").collection("boats");
  return ref.findOne({ name }, { projection: statsProject });
};
const getRarities = async () => {
  const ref = client.db("boats").collection("boats");
  return ref.find({}).project(raritiesProject).toArray();
};
export { getStats, getDrops, getRarities };
export default client;
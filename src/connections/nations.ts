import { client } from "./mongodb";

type Nation =
  | "Eagle Union"
  | "Ironblood"
  | "Bilibili"
  | "Eastern Radiance"
  | "KizunaAI"
  | "Iris Libre"
  | "North Union"
  | "Royal Navy"
  | "Sakura Empire"
  | "Sardegna Empire"
  | "Universal"
  | "Utawarerumono"
  | "Vichya Dominion";
export const getNations = async (nation: Nation | undefined) => {
  const ref = client.db("boats").collection("boats");
  const data = await ref
    .aggregate([
      {
        $group: {
          _id: "$nationality",
          name: { $push: "$name" }
        }
      }
    ])
    .toArray();
  if (nation === undefined) {
    return data.map(d => d.nationality);
  }
};

import supertest from "supertest";
import app from "../src/app";
import client from "../src/connections/mongodb";
import { forbinSkills, forbinDrops, forbinMisc } from "./responses";
beforeAll(async () => {
  await client.connect();
});
describe("Getting drops for a ship", () => {
  it("Should return", async () => {
    supertest(app)
      .get("/drops/Forbin")
      .expect(res => {
        expect(res.body).toEqual(forbinDrops);
      })
      .end(() => client.close());
  });
});
describe("Getting Skills for a ship", () => {
  it("Should return", async () => {
    supertest(app)
      .get("/drops/Forbin")
      .expect(res => {
        expect(res.body).toEqual(forbinSkills);
      })
      .end(() => client.close());
  });
});
describe("Getting Miscelanius for a ship", () => {
  it("Should return", async () => {
    supertest(app)
      .get("/misc/Forbin")
      .expect(res => {
        expect(res.body).toEqual(forbinMisc);
      })
      .end(() => client.close());
  });
});

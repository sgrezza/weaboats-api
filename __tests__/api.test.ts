import supertest from "supertest";
import app from "../src/app";
import client from "../src/connection";
beforeAll(async () => {
  await client.connect();
});
describe("Getting drops for a ship", () => {
  it("Should return", async () => {
    supertest(app)
      .get("/drops/Forbin")
      .expect(res => {
        expect(res.body).toEqual({
          _id: "5de17967142d5980ccdc33b7",
          constructionCategories: {
            limited: "Only during event: Iris of the Light and the Dark"
          },
          constructionNote:
            "Available in Limited Construction during Iris of the Light and the Dark Event.",
          dropNote: "Iris of the Light and the Dark"
        });
      })
      .end(() => client.close());
  });
});

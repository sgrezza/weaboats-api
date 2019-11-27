import express from "express";

const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Hello");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${process.env.PORT}`);
});

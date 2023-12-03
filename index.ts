import express, { Response } from "express";
import { connect as connectToDB } from "mongoose";
import path from "path";
import { Sample, SampleType } from "./lib/models";

const MONGODB_URI = process.env.MONGODB_URI;
async function main() {
  if (!MONGODB_URI) throw new Error("MONGDB_URI is undefined");
  await connectToDB(MONGODB_URI);
  console.log("Connected to mongoDB database");

  const app = express();
  app.use(express.static(path.join(__dirname, "client", "dist")));

  app.get("/api", async (_, res: Response) => {
    const sample = new Sample<SampleType>({
      title: "sample title",
      desc: "sample desc",
      createAt: new Date(),
      isProp: true,
      count: 8,
    });
    await sample.save();

    res.json(await Sample.find());
  });

  app.get("*", (_, res: Response) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });

  const PORT = 3000;
  app.listen(PORT, () =>
    console.log(`App is running at: http://localhost:${PORT}`)
  );
}

try {
  main();
} catch (err: any) {
  console.error(err.message);
}

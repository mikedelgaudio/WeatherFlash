import { promises as fs } from "fs";
import path from "path";

export default async (req, res) => {
  if (req.method !== "GET") {
    return throwError(res);
  }

  if (!req.query.cityId) {
    return throwError(res);
  }

  let cityRes = "";

  try {
    const cityData = await fs.readFile(path.resolve("models/city.list.min.json"), "utf8");
    cityRes = JSON.parse(cityData);
  } catch (err) {
    console.error(err);
  }

  res.statusCode = 200;
  res.json({ cityId: req.query.cityId, info: cityRes });
};

function throwError(res) {
  res.statusCode = 400;
  return res.json({ error: "Unexpected error" });
}

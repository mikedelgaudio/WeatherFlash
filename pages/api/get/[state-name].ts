import { promises as fs } from "fs";
import path from "path";

export default async (req, res) => {
  if (req.method !== "GET") {
    return throwError(res);
  }

  const reqCityId = req.query.cityId;

  if (!reqCityId || isNaN(reqCityId)) {
    return throwError(res);
  }

  let cityRes = [];

  try {
    const cityData = await fs.readFile(path.resolve("models/city.list.min.json"), "utf8");
    cityRes = JSON.parse(cityData);
  } catch (err) {
    console.error(err);
  }

  const cityObj = cityRes.find((city) => city.id === parseInt(reqCityId)) || "";
  const stateName = cityObj.state;

  res.statusCode = 200;
  res.json({ cityId: reqCityId, state: stateName });
};

function throwError(res) {
  res.statusCode = 400;
  return res.json({ error: "Unexpected error" });
}

import { promises as fs } from "fs";
import path from "path";

export default async (req, res) => {
  if (req.method !== "GET") {
    return throwError(res);
  }

  const reqCityInput = req.query.city;

  if (!reqCityInput) {
    return throwError(res);
  }

  let cityRes = [];

  try {
    const cityData = await fs.readFile(path.resolve("models/city.list.min.json"), "utf8");
    cityRes = JSON.parse(cityData);
  } catch (err) {
    return throwError(res);
  }

  const trimmedSearch = Array.from(
    filter(cityRes, (obj) => obj.name.toLowerCase().includes(reqCityInput.toLowerCase()), 3)
  );

  res.statusCode = 200;
  res.json({ results: trimmedSearch });
};

function throwError(res) {
  res.statusCode = 400;
  return res.json({ error: "Unexpected error" });
}

function* filter(array, condition, maxSize) {
  if (!maxSize || maxSize > array.length) {
    maxSize = array.length;
  }
  let count = 0;
  let i = 0;
  while (count < maxSize && i < array.length) {
    if (condition(array[i])) {
      yield array[i];
      count++;
    }
    i++;
  }
}

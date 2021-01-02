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
    console.error(err);
  }

  let x = cityRes.filter((obj) => {
    return obj.name.toLowerCase().includes(reqCityInput.toLowerCase());
  });

  //const cityObj = cityRes.find((city) => city.id === reqInput) || "";
  // const stateName = cityObj.state;

  res.statusCode = 200;
  res.json({ val: x });
  //res.json({ cityId: reqCityId, state: stateName });
};

function throwError(res) {
  res.statusCode = 400;
  return res.json({ error: "Unexpected error" });
}

/*
    {
        "id": 62854,
        "name": "Ceek",
        "state": "NY",
        "country": "SO",
        "coord": {
            "lon": 45.358238,
            "lat": 8.99907
        }
    },
*/

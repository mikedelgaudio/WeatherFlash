import { promises as fs } from "fs";
import path from "path";

interface Location {
  id?: number;
  name?: string;
  state?: string;
  country?: string;
  coord?: { lon?: number; lat?: number };
}

export default async (req, res) => {
  if (req.method !== "GET") {
    return throwError(res);
  }

  const reqCityInput = req.query.city;

  if (!reqCityInput) {
    res.statusCode = 200;
    res.json({ suggestions: [] });
    return;
  }

  let cityRes = [];

  try {
    const cityData = await fs.readFile(path.resolve("models/city.list.min.json"), "utf8");
    cityRes = JSON.parse(cityData);
  } catch (err) {
    return throwError(res);
  }

  const parsedLocation = parseState(reqCityInput);

  //Search City
  let trimmedSearch = Array.from(filter(cityRes, (obj) => match(obj, parsedLocation, "n"), 3));

  //Search State
  if (parsedLocation.state !== "") {
    trimmedSearch = Array.from(filter(trimmedSearch, (obj) => match(obj, parsedLocation, "s"), 3));
  }

  res.statusCode = 200;
  res.json({ suggestions: trimmedSearch });
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

/**
 *
 * @param masterLocations
 * @param parsedLocation
 * @param flags n = filter by city; s = filter by state
 */
function match(masterLocations: Location, parsedLocation: Location, flags: string): number {
  let matched = 0;
  const masterSearchArray = flags === "s" ? masterLocations.state : masterLocations.name;
  const searchTerm = flags === "s" ? parsedLocation.state : parsedLocation.name;
  try {
    if (masterSearchArray.match(new RegExp("\\b" + searchTerm + `.*`, "i"))) {
      matched = 1;
    }
  } catch (e) {
    console.error(e);
  }
  return matched;
}

function parseState(input): Location {
  let splitInput = input.trim().split("");
  let state = "";
  let city = "";
  for (let i = 0; i < splitInput.length; i++) {
    try {
      if (splitInput[i] === " " && splitInput[i + 3] === undefined) {
        console.log("here");
        state += splitInput[i + 1];
        state += splitInput[i + 2];
        break;
      } else {
        if (splitInput[i] !== ",") city += splitInput[i];
      }
    } catch (e) {
      console.error(e);
      break;
    }
  }
  return {
    name: city,
    state: state,
  };
}

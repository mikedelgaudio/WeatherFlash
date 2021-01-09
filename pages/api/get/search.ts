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
  const trimmedSearch = Array.from(filter(cityRes, (obj) => match(obj, parsedLocation), 3));

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

function match(masterLocations: Location, parsedLocation: Location): number {
  let matched = 0;
  try {
    if (masterLocations.name.match(new RegExp("\\b" + parsedLocation.name + `.*`, "i"))) {
      if (
        parsedLocation.state &&
        masterLocations.state.match(new RegExp("\\b" + parsedLocation.state + `.*`, "i"))
      ) {
        console.log("State match");
        matched = 1;
      } else {
        console.log("State NO MATCH");
        matched = 1;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return matched;
}

function parseState(input): Location {
  let splitInput = input.split("");
  let state = "";
  let city = "";
  const regEx = /^[A-Za-z]+$/;
  for (let i = 0; i < splitInput.length; i++) {
    try {
      if (splitInput[i] === " " && regEx.test(splitInput[i + 1]) && regEx.test(splitInput[i + 2])) {
        state += splitInput[i + 1];
        state += splitInput[i + 2];
        break;
      } else {
        // it is a city
        city += splitInput[i];
      }
    } catch (e) {
      break;
    }
  }

  return {
    name: city,
    state: state,
  };
}

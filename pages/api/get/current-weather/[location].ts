export default async (req, res) => {
  if (req.method !== "GET") {
    return throwError(res);
  }

  let search: string = "";

  if (usingCity(req)) {
    const city = req.query.city;
    search = `q=${city}`;
  } else {
    const lat = req.query.lat;
    const lon = req.query.lon;
    search = `lat=${lat}&lon=${lon}`;
  }
  console.log(search);

  const url = `https://api.openweathermap.org/data/2.5/weather?${search}&appid=${process.env.API_KEY}&units=imperial`;

  const fetched = await fetch(url);
  const json = await fetched.json();
  res.statusCode = fetched.status;
  console.log("sent");
  res.json(json);
};

function usingCity(req): boolean {
  if (req.query.city) {
    return true;
  } else {
    return false;
  }
}

function throwError(res) {
  res.statusCode = 400;
  return res.json({ error: "Unexpected error" });
}

export default async (req, res) => {
  if (req.method !== "GET") {
    return throwError(res);
  }

  let search: string = "";

  if (req.query.city) {
    const city = req.query.city;
    search = `q=${city}`;
  } else if (req.query.id) {
    const id = req.query.id;
    search = `id=${id}`;
  } else {
    const lat = req.query.lat;
    const lon = req.query.lon;
    search = `lat=${lat}&lon=${lon}`;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?${search}&appid=${process.env.API_KEY}&units=imperial`;

  const fetched = await fetch(url);
  const json = await fetched.json();
  res.statusCode = fetched.status;
  res.json(json);
};

function throwError(res) {
  res.statusCode = 400;
  return res.json({ error: "Unexpected error" });
}

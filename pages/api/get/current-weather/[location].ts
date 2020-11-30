// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  if (req.method !== "GET") {
    return throwError(res);
  }

  let search: string = "";
  let city: string = "New York";
  let lat: number = 0;
  let long: number = 0;

  const usingCity: boolean = determineMode(req);

  if (usingCity) {
    search = `q=${city}`;
  } else {
    search = `lat=${lat}&lon=${long}`;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?${search}&appid=${process.env.API_KEY}&units=imperial`;

  const fetched = await fetch(url);
  const json = await fetched.json();
  res.statusCode = 200;
  res.json(json);
};

function determineMode(req): boolean {
  console.log(req.query.location + "REQ QUERY");

  return true;
}

function throwError(res) {
  res.statusCode = 400;
  return res.json({ error: "Unexpected error" });
}

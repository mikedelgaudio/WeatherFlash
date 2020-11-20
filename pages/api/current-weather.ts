// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  let search: string = "";
  let city: string = "Hoboken";
  let lat: number = 0;
  let long: number = 0;
  let location: string = "";

  if (location === "coordinates") {
    search = `lat=${lat}&lon=${long}`;
  } else {
    search = `q=${city}`;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?${search}&appid=${process.env.API_KEY}`;

  const fetched = await fetch(url);
  const json = await fetched.json();
  res.statusCode = 200;
  res.json(json);
};

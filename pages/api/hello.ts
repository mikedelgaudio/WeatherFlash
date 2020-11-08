// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const api = `http://api.openweathermap.org/data/2.5/weather?q=Hoboken&appid=${process.env.API_KEY}`;
  const fetched = await fetch(api);
  const json = await fetched.json();
  res.statusCode = 200;
  res.json(json);
};

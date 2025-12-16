import fetch from "node-fetch";

export default async function handler(req, res) {
  const { location_id, limit } = req.query;

  try {
    const response = await fetch(
      `https://api.viator.com/partner/products/search?location=${location_id}&topX=${limit}`,
      {
        headers: {
          "Accept": "application/json",
          "exp-api-key": process.env.VIATOR_API_KEY
        }
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

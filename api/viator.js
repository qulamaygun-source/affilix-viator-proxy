export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.viator.com/partner/products/search?limit=5&currency=USD",
      {
        method: "GET",
        headers: {
          "Accept": "application/json;version=2.0"
          "exp-api-key": process.env.VIATOR_API_KEY
        }
      }
    );

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("Viator API Error:", error);
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}

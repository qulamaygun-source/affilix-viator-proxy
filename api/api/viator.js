export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.viator.com/partner/products/search", {
      method: "GET",
      headers: {
        "Accept": "application/json;version=2.0",
        "api-key": process.env.VIATOR_API_KEY
      }
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}

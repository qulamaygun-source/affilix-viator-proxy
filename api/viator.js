export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const { destId, limit = 5, currency = "USD" } = req.body;

  if (!destId) {
    return res.status(400).json({ error: "destId is required" });
  }

  try {
    const response = await fetch(
      "https://api.viator.com/partner/products/search",
      {
        method: "POST",
        headers: {
          "Accept": "application/json;version=2.0",
          "Content-Type": "application/json",
          "exp-api-key": process.env.VIATOR_API_KEY
        },
        body: JSON.stringify({
          destId,
          limit,
          currency
        })
      }
    );

    const data = await response.json();

    if (data.code) {
      return res.status(400).json({ error: data.message, code: data.code });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error("Viator API Error:", error);
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}

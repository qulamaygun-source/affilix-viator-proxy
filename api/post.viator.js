export default async function handler(req, res) {
  // 1️⃣ Yalnız POST metodunu qəbul et
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  } 

  // 2️⃣ Sorğu bədənindən məlumatları götür
  const { destId, limit = 5, currency = "USD" } = req.body;

  if (!destId) {
    return res.status(400).json({ error: "destId is required" });
  }

  try {
    // 3️⃣ Viator API-ə POST sorğusu göndər
    const response = await fetch(
      "https://api.viator.com/partner/products/search",
      {
        method: "POST",
        headers: {
          "Accept": "application/json;version=2.0",
          "Content-Type": "application/json",
          "exp-api-key": process.env.VIATOR_API_KEY
        },
        body: JSON.stringify({ destId, limit, currency })
      }
    );

    // 4️⃣ HTTP status yoxlaması
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: "Viator API-dən Xarici Xəta",
        statusCode: response.status,
        details: errorData.message || response.statusText
      });
    }

    // 5️⃣ JSON cavabı oxu
    const data = await response.json();

    // 6️⃣ Viator-un öz biznes xətalarını yoxla
    if (data.code) {
      return res.status(400).json({ error: data.message, code: data.code });
    }

    // 7️⃣ Uğurlu cavabı qaytar
    res.status(200).json(data);

  } catch (error) {
    console.error("Viator API Xətası (Şəbəkə/JSON Parse):", error);
    res.status(500).json({ error: "Proxy Xətası", details: error.message });
  }
}

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({
      status: "error",
      message: "username missing",
      Developer: "@mynk_mynk_mynk | Mynk"
    });
  }

  const backendURL =
    `http://152.53.86.112:8080/api?username=${encodeURIComponent(username)}`;

  try {
    const r = await fetch(backendURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });

    const text = await r.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(200).json({
        status: "error",
        message: "Invalid backend response",
        Developer: "@mynk_mynk_mynk | Mynk"
      });
    }

    // 🔥 REMOVE / OVERRIDE developer from inside result
    if (Array.isArray(data.result)) {
      data.result = data.result.map(item => {
        delete item.Developer; // ❌ remove cutehack
        return {
          ...item,
          Developer: "@mynk_mynk_mynk | Mynk" // ✅ add yours
        };
      });
    }

    // 🔥 Root level developer
    data.Developer = "@mynk_mynk_mynk | Mynk";

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "backend fetch failed",
      Developer: "@mynk_mynk_mynk | Mynk"
    });
  }
}

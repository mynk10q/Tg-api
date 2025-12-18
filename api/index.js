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

    try {
      const data = JSON.parse(text);
      data.Developer = "@mynk_mynk_mynk | Mynk";
      return res.status(200).json(data);
    } catch {
      res.setHeader("Content-Type", "application/json");
      return res.status(200).send(
        text + `\n\n"Developer": "@mynk_mynk_mynk | Mynk"`
      );
    }

  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "backend fetch failed",
      Developer: "@mynk_mynk_mynk | Mynk"
    });
  }
}

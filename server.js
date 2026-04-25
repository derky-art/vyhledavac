const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static(__dirname));

const API_KEY = process.env.SERPAPI_KEY

app.get("/api/search", async (req, res) => {
  const q = req.query.q;

  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google",
        q: q,
        api_key: API_KEY,
        num: 10   // 1. stránka
      }
    });

    const results = (response.data.organic_results || []).map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet
    }));

    res.json(results);

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

/*app.listen(3000, () => console.log("http://localhost:3000"));
module.exports = app;*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server běží na portu " + PORT);
});
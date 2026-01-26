const { translate } = require("@vitalets/google-translate-api");


const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


app.post("/translate", async (req, res) => {
  const { text, targetLang } = req.body;

  if (!text) {
    return res.json({ translatedText: "" });
  }

  try {
    const result = await translate(text, { to: targetLang });
    res.json({ translatedText: result.text });
  } catch (error) {
    console.error("Translation error:", error.message);
    res.json({ translatedText: "Translation failed" });
  }
});


// Simple mandi price data
const mandiData = {
  tomato: { min: 18, avg: 22 },
  onion: { min: 20, avg: 26 },
};

// Price discovery endpoint
app.post("/price", (req, res) => {
  const { crop, quantity } = req.body;

  if (!mandiData[crop]) {
    return res.status(400).json({ error: "Crop not found" });
  }

  const data = mandiData[crop];

  res.json({
    min: data.min * quantity,
    avg: data.avg * quantity,
    recommended: data.avg * quantity,
  });
});

app.post("/negotiate", (req, res) => {
  const { offer, avg } = req.body;

  let advice = "";

  if (offer < avg * 0.8) {
    advice = "❌ Offer is too low. Consider increasing the price.";
  } else if (offer <= avg) {
    advice = "✅ This is a fair and reasonable price.";
  } else {
    advice = "👍 Good deal for the vendor.";
  }

  res.json({ advice });
});


app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

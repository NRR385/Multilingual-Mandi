import { useState } from "react";

function App() {
  // Language & Translation
  const [language, setLanguage] = useState("en");
  const [message, setMessage] = useState("");
  const [translated, setTranslated] = useState("");

  // Price Discovery
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(null);

  // Negotiation
  const [offer, setOffer] = useState("");
  const [advice, setAdvice] = useState("");

  // Translate message
  const translateMessage = async () => {
    if (!message) return;

    const res = await fetch("http://localhost:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: message,
        targetLang: language,
      }),
    });

    const data = await res.json();
    setTranslated(data.translatedText);
  };

  // Get price from backend
  const getPrice = async () => {
    if (!crop || quantity <= 0) return;

    const res = await fetch("http://localhost:5000/price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        crop,
        quantity,
      }),
    });

    const data = await res.json();
    setPrice(data);
    setOffer("");
    setAdvice("");
  };

  // Check negotiation offer
  const checkOffer = async () => {
    if (!price || !offer) return;

    const res = await fetch("http://localhost:5000/negotiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offer: Number(offer),
        avg: price.avg,
      }),
    });

    const data = await res.json();
    setAdvice(data.advice);
  };

  return (
    <div
  style={{
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  }}
>
  <div
    style={{
      backgroundColor: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "700px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      fontFamily: "Arial",
    }}
  >

    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px" }}>
      <h1 style={{ marginBottom: "8px" }}>
  🌾 Multilingual Mandi
</h1>
      <p style={{ color: "#555", marginBottom: "24px" }}>
  Empowering local vendors with multilingual AI-driven price discovery
  and fair negotiation.
</p>


      {/* Language Selection */}
      <h3>Language</h3>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="te">Telugu</option>
        <option value="ta">Tamil</option>
      </select>

      <hr />

      {/* Translation */}
      <h3>Translate Message</h3>
      <textarea
        rows="3"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%" }}
      />
      <br /><br />
      <button onClick={translateMessage}>Translate</button>
      <p>
        <b>Translated:</b>{" "}
        {translated ? translated : "—"}
      </p>


      <hr />

      {/* Price Discovery */}
      <h3>Price Discovery</h3>
      <input
        placeholder="Enter crop name (e.g.,tomato)"
        value={crop}
        onChange={(e) => setCrop(e.target.value.toLowerCase())}
      />
      <br /><br />
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <br /><br />
      <button onClick={getPrice}>Get Price</button>

      {price && (
        <div>
          <p>Minimum Price: ₹{price.min}</p>
          <p>Average Price: ₹{price.avg}</p>
          <p>Recommended Price: ₹{price.recommended}</p>
        </div>
      )}

      <hr />

      {/* Negotiation Assistant */}
      {price && (
        <>
          <h3>Negotiation Assistant</h3>
          <input
            type="number"
            placeholder="Enter your offer"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
          <br /><br />
          <button onClick={checkOffer}>Check Offer</button>
          <p><b>AI Advice:</b> {advice}</p>
        </>
      )}
    </div>
      </div>
</div>

  );
}

export default App;

import express from "express";
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "minimindbot";   // ← your token here

// Webhook verification (GET)
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WEBHOOK VERIFIED");
        return res.status(200).send(challenge);
    } else {
        return res.sendStatus(403);
    }
});

// Receiving messages (POST)
app.post("/webhook", (req, res) => {
    console.log("Incoming message:", JSON.stringify(req.body, null, 2));
    return res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));

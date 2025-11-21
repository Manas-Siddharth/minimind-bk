import express from "express";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "mysecretkey";

// WEBHOOK VERIFICATION
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// RECEIVE MESSAGES
app.post("/webhook", (req, res) => {
  console.log("Incoming message:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// EXPORT FOR VERCEL
export default app;

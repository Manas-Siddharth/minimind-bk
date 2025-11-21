export default function handler(req, res) {

  const VERIFY_TOKEN = "mysecretkey";

  // WEBHOOK VERIFICATION (GET)
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK VERIFIED");
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("Token verification failed");
    }
  }

  // RECEIVING MESSAGES (POST)
  if (req.method === "POST") {
    console.log("Incoming message:", JSON.stringify(req.body, null, 2));
    return res.status(200).send("EVENT_RECEIVED");
  }

  return res.status(405).send("Method Not Allowed");
}

export default function handler(req, res) {

    const VERIFY_TOKEN = "mysecretkey";

    // 1️⃣ VERIFICATION (GET request from Meta)
    if (req.method === "GET") {
        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            console.log("WEBHOOK VERIFIED");
            return res.status(200).send(challenge);
        } else {
            return res.sendStatus(403);
        }
    }

    // 2️⃣ HANDLE INCOMING MESSAGES (POST)
    if (req.method === "POST") {
        console.log("Incoming message:", JSON.stringify(req.body, null, 2));
        return res.sendStatus(200);
    }

    return res.status(405).send("Method Not Allowed");
}


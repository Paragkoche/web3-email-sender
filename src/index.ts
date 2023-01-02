import express from "express";
import { Mailchain } from "@mailchain/sdk";
import { Deta } from "deta";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const deta = Deta("c0iaxswh_irtw59FYgbftgS6Q5DTWLHZj9YVZJ6dM");
const db = deta.Base("mama-db");
const secretRecoveryPhrase =
  "catalog useless rifle have jelly season unlock alert blood sound cause state cousin dawn they shiver pattern actress spray climb know spike cat kid"; // 25 word mnemonicPhrase
app.get("/text", (r, q) => q.send("ok"));
app.post("/", async (req, res) => {
  const json = req.body;
  const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);
  const user = await mailchain.user();
  db.insert(json);
  const r = await mailchain.sendMail({
    from: user.address,
    to: [`vrcclinic@mailchain.com`],
    subject: "New Appointment",
    content: {
      text: "New Appointment",
      html: `
          <h1>Name</h1>
          <p>${json.fist_name} ${json.last_name}</p>
          <h1>Date of Birth</h1>
          <p>${json.dob}</p>
          <h1>Contact details</h1>
          <div>
          <p>phone Number : <a herf="tel://${json.phone_number}">${json.phone_number}</a>
          <p>address : <address>${json.address}</address>
          </div>
          <h1>what happened??</h1>
          <p>${json.happened}</p>
          
          `,
    },
  });
  res.json(r.status);
});
app.listen(process.env.PORT || 3000);

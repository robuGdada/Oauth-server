import { PrismaClient } from "@prisma/client";
import express from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";

const prisma = new PrismaClient();
const app = express();
var cors = require("cors");

app.use(cors());
app.use(express.json());
const Port = 3001;
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const oAuthClient = new OAuth2Client(CLIENT_ID);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/users/registration", async (req, res) => {
  const { googleToken } = req.body;
  if (!CLIENT_ID) return;
  console.log("Received googleToken:", googleToken);
  let newUser = null;
  let hasUsername = false;
  try {
    console.log("on try");
    const ticket = await oAuthClient.verifyIdToken({
      idToken: String(googleToken),
      audience: [CLIENT_ID],
    });

    const payload: TokenPayload | undefined = ticket.getPayload();
    if (!payload) {
      throw new Error("Invalid token payload");
    }
    console.log("payload", payload);
    const name = payload.given_name || payload.family_name || "";
    const email = payload.email;

    let newUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!newUser) {
      newUser = await prisma.user.create({
        data: {
          email: email,
          name,
        },
      });
    } else {
      if (newUser.username) {
        hasUsername = true;
      }
    }

    res.json({ ...newUser, hasUsername: hasUsername });
  } catch (e) {
    console.error("User creation failed:", e);
    res.status(401).send("User creation failed");
  }
});
app.listen(Port, () => {
  console.log(`Server up on port ${Port}`);
});

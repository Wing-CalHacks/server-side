import express from "express";
import { getWebsites, addWebsite, addUser, getUsers } from "./db.mjs";
const app = express();
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies

app.get("/websites", async (req, res) => {
  const websites = await getWebsites();
  res.status(200).send(websites);
});

app.post("/websites", async (req, res) => {
  const { website_name, website_url } = req.body;
  try {
    await addWebsite(website_name, website_url);
    res.status(200).send("website added successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/users", async (req, res) => {
  const { website_id, user_name, user_email } = req.body;
  try {
    await addUser(website_id, user_name, user_email);
    res.status(200).send("user added successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users", async (req, res) => {
  const { website_id } = req.body;
  try {
    const users = await getUsers(website_id);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

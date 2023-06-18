import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USR,
    password: process.env.PASSWORD,
    database: process.env.DB,
  })
  .promise();

// websites
export async function getWebsites() {
  const [rows] = await pool.query("SELECT * FROM website");
  return rows;
}
export async function getWebsite(id) {
  const [rows] = await pool.query(
    `SELECT * FROM website WHERE website_id = ?`,
    [id]
  );
  return rows;
}
export async function addWebsite(website_name, website_url) {
  const result = await pool.query(
    "INSERT INTO website (website_name, website_url) VALUES (?, ?)",
    [website_name, website_url]
  );
  return result;
}

//users
export async function addUser(website_id, user_name, user_email) {
  const result = await pool.query(
    "INSERT INTO Users (website_id, user_name, user_email) VALUES (?, ?, ?)",
    [website_id, user_name, user_email]
  );
  return result;
}

export async function getUsers(website_id) {
  const [rows] = await pool.query(
    "SELECT Users.* FROM Users JOIN website ON Users.website_id = website.website_id WHERE website.website_id = ?;",
    [website_id]
  );
  return rows;
}

//session

const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const data = require("./data.json");

app.use(bodyParser.json());
const secretKey = "inikuncirahasia";

function generateAccessToken(username) {
  return jwt.sign(username, secretKey, { expiresIn: "1h" });
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === 123) {
    const token = generateAccessToken({ username });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (typeof token != "undefined") {
    const tokenParts = token.split(" ")[1];

    jwt.verify(tokenParts, secretKey, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.username = decoded.username;
        next();
      }
    });
  } else {
    res.sendStatus(403).json({ message: "Unauthorized" });
  }
}

app.get("/data", verifyToken, (req, res) => {
  res.json("Data Tersedia");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

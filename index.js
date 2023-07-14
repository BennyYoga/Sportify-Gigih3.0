const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const UserData = require("./data.json");

app.use(bodyParser.json());
const secretKey = "inikuncirahasia";

function generateAccessToken(username) {
  return jwt.sign(username, secretKey, { expiresIn: "1h" });
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  var IdUser = UserData.filter(
    (user) => user.name == username && user.password == password
  );
  if (IdUser) {
    var id = IdUser[0].IdUser;
    var name = IdUser[0].name;
    const token = generateAccessToken({ id, name });
    res.setHeader('Authorization', `${token}`);
    res.status(200).json({ message: "Login Berhasil" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (typeof token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "Unauthorized" });
      } else {
        req.user = [decoded.name, decoded.id];
        next();
      }
    });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
}

app.get("/", verifyToken, (req, res) => {
  let name = req.user;
  DataSong = UserData.filter(
    (user) => user.name == name[0] && user.IdUser == name[1]
  );
  res.send(DataSong);
});

app.post("/add/:name", (req, res) => {
  name = req.params.name;
  DataSong = UserData.filter((user) => user.name == name);
  Index = UserData.indexOf(DataSong[0]);
  NewSong = {
    IdSong: DataSong[Index].song.length + 1,
    title: req.body.title,
    artist: req.body.artist,
    status: "Stopped",
    url: req.body.url,
  };
  UserData[Index].song.push(NewSong);
  res.status(200).json("Data Berhasil Ditambahkan");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

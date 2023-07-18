const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const UserData = require("./app/data/User.json");

const {getAllData, getSong, getPlaylist, playSong, makePlaylist, addSongtoPlaylist} = require("./app/song/controller/songController");
const { verifyToken, login } = require("./app/auth/controller/authController");


app.use(bodyParser.json());

app.post("/login", login);
app.get("/", verifyToken, getAllData);
app.get("/song", verifyToken, getSong);
app.get("/playlist", verifyToken, getPlaylist);

app.post("/playlist", verifyToken, makePlaylist);
app.post("/addtoplaylist", verifyToken, addSongtoPlaylist);
app.patch("/play/:id", verifyToken, playSong);
app.post("/add/:name", (req, res) => {
  name = req.params.name;
  DataSong = UserData.filter((user) => user.name == name);
  Index = UserData.indexOf(DataSong[0]);

  //Buat Datasong Baru
  NewSong = addPl(DataSong[Index], req);
  UserData[Index].playlist.push(NewSong);

  res.status(200).json("Data Berhasil Ditambahkan");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

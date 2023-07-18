const Song = require("../../../app/data/Song.json");
const playlist = require("../../../app/data/Playlist.json");
const userServices = require("../../auth/controller/authController");
const playlistModel = require("../models/playlistModel");

function PlaylistAndSong(userData, kriteria) {
  let playlistData = playlist.filter((list) => list.IdUser === userData.IdUser);
  let allSong = [];
  playlistData = playlistData.map((list) => {
    let song = list.song.map((item) => {
      let songData = Song.find((song) => song.IdSong === item.IdSong);
      allSong.push({ ...songData, count: item.count });
      return { ...songData, count: item.count };
    });
    return { ...list, song: song };
  });
  if (kriteria === "song") {
    return allSong;
  } else {
    return playlistData;
  }
}

function getAllData(req, res) {
  userData = userServices.getUser(req);
  playlistData = PlaylistAndSong(userData, "playlist");
  let allData = { ...userData, playlist: playlistData };
  res.send(allData);
}

function getSong(req, res) {
  userData = userServices.getUser(req);
  let song = PlaylistAndSong(userData, "song");

  const uniqueData = [];
  const seenIds = new Set();
  
  song.forEach(item => {
      if (!seenIds.has(item.IdSong)) {
          seenIds.add(item.IdSong);
          uniqueData.push(item);
      }
  });

  uniqueData.sort(function (a, b) {
    return b.count - a.count;
  });

  res.send(uniqueData);
}

function getPlaylist(req, res) {
  userData = userServices.getUser(req);
  let allData = PlaylistAndSong(userData, "playlist");
  res.send(allData);
}

function playSong(req, res) {
  let id = req.params.id;
  userData = userServices.getUser(req);

  let playlistData = playlist.filter((list) => list.IdUser === userData.IdUser);
  playlistData = playlistData.map((list) => {
    list.song.map((item) => {
      if (item.IdSong == id) {
        item.count++;
      }
    });
  });

  res.send("Song Played");
}

function makePlaylist(req, res) {
  try {
    userData = userServices.getUser(req);
    playlist.push(playlistModel(userData, req.body.name, req.body.desc));
    res.send("Playlist Created");
  } catch (err) {
    res.send(err);
  }
}

function addSongtoPlaylist(req, res) {
  let idSong = req.body.IdSong;
  let Idplaylist = req.body.IdPlaylist;

  let index = playlist.findIndex((list) => list.IdPlaylist == Idplaylist);
  console.log(index);
  if (index == -1) {
    index = playlist.length;
  }
  playlist[index].song.push({ IdSong: idSong, count: 0 });
  res.send("Song Added");
}

module.exports = {
  getAllData,
  getSong,
  getPlaylist,
  playSong,
  makePlaylist,
  addSongtoPlaylist,
};

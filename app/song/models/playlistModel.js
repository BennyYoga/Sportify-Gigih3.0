playlistModel = (user, name, description) => {
    playlist = {
      IdPlaylist : "Playlist100",
      IdUser: user.IdUser,
      name : name,
      desc : description,
      song: [],
    };
  
    return playlist;
};

module.exports = playlistModel;
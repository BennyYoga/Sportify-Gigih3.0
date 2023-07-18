const jwt = require("jsonwebtoken");
const secretKey = "inikuncirahasia";
const UserData = require("../../../app/data/User.json");
const User = require("../../../app/data/User.json");


function generateAccessToken(username) {
  return jwt.sign(username, secretKey, { expiresIn: "1h" });
}

function getUser(req) {
  let name = req.user;
  let userData = User.find(
    (user) => user.name === name[0] && user.IdUser === name[1]
  );

  return userData;
}

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

function login(req, res) {
  const { username, password } = req.body;
  var IdUser = UserData.filter(
    (user) => user.name == username && user.password == password
  );
  if (IdUser) {
    var id = IdUser[0].IdUser;
    var name = IdUser[0].name;
    const token = generateAccessToken({ id, name });
    res.setHeader("Authorization", `${token}`);
    res.status(200).json({ message: "Login Berhasil dengan token : "+ token});
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
}

module.exports = { generateAccessToken, verifyToken, login ,getUser };

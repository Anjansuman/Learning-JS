const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "trecko";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "anjan@gmail.com",
    password: "abc",
    name: "Anjan Suman",
  },
  {
    username: "abhishek@gmail.com",
    password: "tag",
    name: "Abhishek Kumar",
  },
  {
    username: "praroop@gmail.com",
    password: "free",
    name: "Praroop Anand",
  },
];

function userExists(username, password) {
    for(let i=0; i < ALL_USERS.length; i++) {
        if(ALL_USERS[i].username == username && ALL_USERS[i].password == password) {
            return true;
        }
    }
    return false;
}

app.post("/sign-in", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "The user doesn't exist",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    
    return res.json({
        user: ALL_USERS.filter((value) => {
            if(value.username == username) {
                return false;
            }
            return true;
        })
    })
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }

});

app.listen(3000)
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
app.use(bodyParser.json());
app.use(express.static("public"));

//TODO

// app.locals.leadersData = require("./leaderboard.json");

const data = fs.readFileSync("leaderboard.json");
const leadersData = JSON.parse(data);

app.get("/", function (req, res) {
  const leadersList = leadersData.leaders;
  const sortedLeaders = leadersList.sort(function (a, b) {
    return b.points - a.points;
  });
  res.render("home", { leaders: sortedLeaders });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});

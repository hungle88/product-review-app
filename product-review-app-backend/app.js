var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fs = require("fs");
const cors = require("cors");

const uaa = require("./middlewares/uaa");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");

var app = express();

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(
  "mongodb+srv://hung:abc1234567@cluster0.7hv9o.mongodb.net?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

let connection;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", function (req, res, next) {
  const log = fs.createWriteStream(__dirname + "/access.log", { flags: "a" });
  log.write(new Date()+req.method + req.url + "\n");

  next();
});

//list all request from log
app.get("/log", uaa.checkToken, uaa.isSuperUser, function (req, res, next) {
  // app.get("/log", function (req, res, next) {
  console.log(req.role);
  let textFile = fs.createReadStream(__dirname + "/access.log");
  textFile.pipe(res);
});

app.use("/", (req, res, next) => {
  if (!connection) {
    // connect to database
    client.connect(function (err) {
      connection = client.db("product_app");
      req.db = connection;
      next();
    });
  } else {
    req.db = connection;
    next();
  }
});

app.use(uaa.checkToken);

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.use("/users", uaa.checkToken, usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(4000, function () {
  console.log("It's running on port 4000");
});

module.exports = app;

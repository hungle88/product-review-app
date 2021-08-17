var express = require("express");
var router = express.Router();
const jwtManager = require("../jwt/jwtManager");

router.post("/login", (req, res) => {
  req.db
    .collection("users")
    .findOne({ email: req.body.email })
    .then((data) => {
      // console.log(data);
      if (req.body.password === data.password) {
        if (data) {
          const payload = {};
          payload.role = data.role;
          payload.fname = data.fname;

          const token = jwtManager.generate(payload);
          res.json({
            status: "success",
            _id: data._id,
            role: data.role,
            fname: data.fname,
            result: token,
          });
        } else {
          res.status(500).send("invalid user");
        }
      } else {
        res.status(500).send("invalid user");
      }
    })
    .catch((err) => {
      res.json({ status: "error" });
    });
});

router.post("/signup", (req, res) => {
  req.db
    .collection("users")
    .findOne({ email: req.body.email })
    .then((doc) => {
      if (doc) {
        // console.log(doc);
        res.status(500).send("email exist");
      } else {
        req.db
          .collection("users")
          .insertOne(req.body)
          .then((data) => {
            res.json({ status: "success" });
          })
          .catch((err) => {
            res.json({ status: "failed" });
          });
      }
    })
    .catch((err) => {
      res.json({ status: "failed" });
    });
});

module.exports = router;

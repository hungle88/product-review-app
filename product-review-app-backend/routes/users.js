var express = require("express");
var router = express.Router();
const uaa = require("../middlewares/uaa");

const { ObjectID } = require("bson");

//fetch all user information
router.get("/", uaa.isSuperUser, (req, res) => {
  req.db
    .collection("users")
    .find({ role: "user" })
    .project({
      products: 1,
      fname: 1,
      lname: 1,
      email: 1,
      password: 1,
      status: 1,
      _id: 1,
    })
    .toArray(function (err, data) {
      if (err) {
        throw err;
      }
      console.log(req.fname + " " + req.role);

      data.forEach((item) => console.log(item));
      res.json(data);
    });
});

//fetch all products
router.get("/products", (req, res) => {
  req.db
    .collection("users")
    .aggregate([
      { $unwind: "$products" },
      // { $group: { _id: "$products" } },
      {
        $project: {
          // fname: 1,
          // lname: 1,
          products: 1,
          _id: 0,
        },
      },
    ])
    .toArray(function (err, data) {
      if (err) throw err;
      data.forEach((item) => console.log(item));
      res.json(data);
    });
});

//add new product
router.post("/:id/products/", (req, res) => {
  req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.params.id) })
    .then((data) => {
      let payload = req.body;
      payload.productId = new ObjectID();
      payload.ownerId = ObjectID(req.params.id);
      req.db
        .collection("users")
        .updateOne(
          { _id: new ObjectID(req.params.id) },
          {
            $push: {
              products: payload,
            },
          }
        )
        .then((data) => {
          res.json({ status: "added" });
        })
        .catch((err) => {
          res.json({ status: "error" });
        });
    })

    .catch((err) => {
      res.json({ status: "error" });
    });
});

//delete product
router.delete("/:ownerId/product/:productId", (req, res) => {
  req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.params.ownerId) })
    .then((data) => {
      if (req.fname === data.fname) {
        req.db
          .collection("users")
          .updateOne(
            {
              "products.productId": new ObjectID(req.params.productId),
            },
            {
              $pull: {
                products: {
                  productId: new ObjectID(req.params.productId),
                },
              },
            }
          )
          .then((data) => {
            res.json({ status: "deleted" });
          })
          .catch((err) => {
            res.json({ status: "error" });
          });
      } else {
        res.json({ user: "invalid" });
      }
    })

    .catch((err) => {
      res.json({ status: "error" });
    });
});

//get one product
router.get("/:productId/", (req, res) => {
  req.db
    .collection("users")
    .aggregate([
      { $match: { "products.productId": ObjectID(req.params.productId) } },
      {
        $project: {
          products: {
            $filter: {
              input: "$products",
              as: "products",
              cond: {
                $eq: ["$$products.productId", ObjectID(req.params.productId)],
              },
            },
          },
        },
      },
    ])
    .toArray(function (err, data) {
      if (err) throw err;
      console.log(req.params.productId);
      data.forEach((item) => console.log(item));
      res.json(data);
    });
});

//edit product info
router.put("/:ownerId/product/:productId", (req, res) => {
  req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.params.ownerId) })
    .then((data) => {
      console.log(data);
      console.log("yeahhh")
      if (req.fname === data.fname) {
        req.db
          .collection("users")
          .updateOne(
            { "products.productId": new ObjectID(req.params.productId) },
            {
              $set: {
                "products.$.title": req.body.title,
                "products.$.description": req.body.description,
                "products.$.price": req.body.price,
              },
            }
          )
          .then((data) => {
            res.json({ status: "Updated" });
          })
          .catch((err) => {
            res.json({ status: "error" });
          });
      } else {
        res.json({ user: "invalid" });
      }
    })
    .catch((err) => {
      res.json({ status: "error" });
    });
});

//add review

router.put("/:id/product/:productId/reviews", (req, res) => {
  req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.params.id) })
    .then((data) => {
      let payload = req.body;
      // payload.ownerId = ObjectID(req.params.id);

      // console.log(payload.fname);
      // if (req.fname === payload.fname) {
      payload.reviewId = ObjectID();
      req.db
        .collection("users")
        .updateOne(
          { "products.productId": new ObjectID(req.params.productId) },
          {
            $push: {
              "products.$.reviews": req.body,
            },
          }
        )
        .then((data) => {
          res.json({ status: "review added" });
        })
        .catch((err) => {
          res.json({ status: "error" });
        });
      // } else {
      //   res.json({ user: "invalid username" });
      // }
    })

    .catch((err) => {
      res.json({ status: "error" });
    });
});

//delete review

router.delete("/:ownerId/reviews/:reviewId", (req, res) => {
  req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.params.ownerId) })
    .then((data) => {
      // console.log(data.products[0].reviews[0].fname)
      // console.log("heyyy")
      for (let i = 0; i < data.products.length; i++) {
        if (data.products[i].reviews) {
          for (let j = 0; j < data.products[i].reviews.length; j++) {
            // console.log("heyyy")

            if (data.products[i].reviews[j].reviewId == req.params.reviewId) {
              // console.log("heyyy")

              // console.log(data.products[i].reviews[j].reviewId)
              if (req.fname !== data.products[i].reviews[j].fname) {
                res.json({ user: "invalid" });
              } else {
                req.db
                  .collection("users")
                  .updateOne(
                    {
                      "products.reviews.reviewId": new ObjectID(
                        req.params.reviewId
                      ),
                    },
                    {
                      $pull: {
                        "products.$.reviews": {
                          reviewId: new ObjectID(req.params.reviewId),
                        },
                      },
                    }
                  )
                  .then((data) => {
                    res.json({ status: "deleted" });
                  })
                  .catch((err) => {
                    res.json({ status: "error" });
                  });
              }
            }
          }
        } else {
          continue;
        }
      }
    })
    .catch((err) => {
      res.json({ status: "error" });
    });
});

//edit review

router.put("/:id/reviews/:reviewId", (req, res) => {
  req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.params.id) })
    .then((data) => {
      // getting the index of the review in the reviews array
      for (let i = 0; i < data.products.length; i++) {
        for (let j = 0; j < data.products[i].reviews.length; j++) {
          if (data.products[i].reviews[j].reviewId == req.params.reviewId) {
            if (req.fname != data.products[i].reviews[j].fname) {
              res.json({ user: "invalid" });
            } else {
              let payload = req.body;

              payload.reviewId = ObjectID();

              req.db
                .collection("users")
                .updateOne(
                  {
                    "products.reviews.reviewId": new ObjectID(
                      req.params.reviewId
                    ),
                  },
                  {
                    $push: {
                      "products.$.reviews": req.body,
                    },
                  }
                )
                .then((data) => {
                  req.db
                    .collection("users")
                    .updateOne(
                      {
                        "products.reviews.reviewId": new ObjectID(
                          req.params.reviewId
                        ),
                      },
                      {
                        $pull: {
                          "products.$.reviews": {
                            reviewId: new ObjectID(req.params.reviewId),
                          },
                        },
                      }
                    )
                    .then((data) => {
                      res.json({ status: "review updated successfully" });
                    })
                    .catch((err) => {
                      res.json({ status: "error" });
                    });
                })
                .catch((err) => {
                  res.json({ status: "error" });
                });
            }
          }
        }
      }
    })
    .catch((err) => {
      res.json({ status: "error" });
    });
});

//add rating
//excellent

router.put("/:id/products/:productId/excellent", (req, res) => {
  // console.log(req.params.id);
  // console.log(req.params.productId);
  // console.log("heyyy");
  req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.params.id) })
    .then((data) => {
      console.log(req.params.id);
  console.log(req.params.productId);
  console.log("heyyy");
      req.db
        .collection("users")
        .updateOne(
          { "products.productId": new ObjectID(req.params.productId) },
          {
            $inc: {
              "products.$.excellent": 1,
            },
          }
        )
        .then((data) => {
          res.json({ status: "excellent rating added" });
        })
        .catch((err) => {
          res.json({ status: "error" });
        });
    })

    .catch((err) => {
      res.json({ status: "error" });
    });
});

//bad rating

router.put("/:id/products/:productId/bad", (req, res) => {
  req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.params.id) })
    .then((data) => {
      req.db
        .collection("users")
        .updateOne(
          { "products.productId": new ObjectID(req.params.productId) },
          {
            $inc: {
              "products.$.bad": 1,
            },
          }
        )
        .then((data) => {
          res.json({ status: "bad rating added" });
        })
        .catch((err) => {
          res.json({ status: "error" });
        });
    })

    .catch((err) => {
      res.json({ status: "error" });
    });
});

//good rating
router.put("/:id/products/:productId/good", (req, res) => {
  req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.params.id) })
    .then((data) => {
      req.db
        .collection("users")
        .updateOne(
          { "products.productId": new ObjectID(req.params.productId) },
          {
            $inc: {
              "products.$.good": 1,
            },
          }
        )
        .then((data) => {
          res.json({ status: "good rating added" });
        })
        .catch((err) => {
          res.json({ status: "error" });
        });
    })

    .catch((err) => {
      res.json({ status: "error" });
    });
});

//compute reputation score
router.put("/:ownerId/products/:productId/reputation", (req, res) => {
  req.db
    .collection("users")
    .findOne({ _id: new ObjectID(req.params.ownerId) })
    .then((data) => {
      let payload = null;
      for (let i = 0; i < data.products.length; i++) {
        if (data.products[i].productId == req.params.productId) {
          if (!data.products[i].excellent) {
            data.products[i].excellent = 0;
          }
          if (!data.products[i].bad) {
            data.products[i].bad = 0;
          }
          payload = data.products[i].excellent * 2 - data.products[i].bad;
        }
      }

      req.db
        .collection("users")
        .updateOne(
          { "products.productId": new ObjectID(req.params.productId) },
          {
            $set: { "products.$.reputation": payload },
          }
        )
        .then((data) => {
          res.json({ status: "reputation added" });
        })
        .catch((err) => {
          res.json({ status: "error" });
        });
    })

    .catch((err) => {
      res.json({ status: "error" });
    });
});

//sort by reputation

router.get("/products/sortbyreputation", (req, res) => {
  req.db
    .collection("users")
    .aggregate([
      { $unwind: "$products" },
      { $sort: { "products.reputation": -1 } },
      // { $group: { _id: "list", products: { $push: "$products" } } },
      {
        $project: {
          fname: 1,
          lname: 1,
          products: 1,
        },
      },
    ])
    .toArray(function (err, data) {
      if (err) throw err;
      data.forEach((item) => console.log(item));
      res.json(data);
    });
});

//deactive account

router.put("/:id/deactivate", uaa.isSuperUser, (req, res) => {
  // router.put("/:id/deactivate", (req, res) => {
  req.db
    .collection("users")
    .updateOne(
      { _id: new ObjectID(req.params.id) },
      { $set: { status: "deactivate" } }
    )

    .then((data) => {
      console.log("was deactivated");
      res.json({ status: "deactivate" });
    })
    .catch((err) => {
      res.json({ status: "error" });
    });
});

//activate account

router.put("/:id/activate", uaa.isSuperUser, (req, res) => {
  // router.put("/:id/activate", (req, res) => {
  req.db
    .collection("users")
    .updateOne(
      { _id: new ObjectID(req.params.id) },
      { $set: { status: "activate" } }
    )

    .then((data) => {
      console.log("was activated");
      res.json({ status: "activate" });
    })
    .catch((err) => {
      res.json({ status: "error" });
    });
});

//reset password

router.put("/:id/password", uaa.isSuperUser, (req, res) => {
  // router.put("/:id/password", (req, res) => {
  req.db
    .collection("users")
    .updateOne(
      { _id: new ObjectID(req.params.id) },
      { $set: { password: req.body.password } }
    )

    .then((data) => {
      console.log("password reset");
      res.json({ status: "password reset" });
    })
    .catch((err) => {
      res.json({ status: "error" });
    });
});

module.exports = router;

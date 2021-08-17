const jwtManager = require("../jwt/jwtManager");

class Uaa {
  checkToken(req, res, next) {
    if (req.url === "/auth/login" || req.url === "/auth/signup") {
      next();
      return;
    }
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ status: "auth_error" });
    } else {
      const data = jwtManager.verify(token);
      // console.log(data);
      if (!data) {
        return res.json({ status: "auth_error" });
      }
      req.role = data.role;
      req.fname = data.fname;
      // console.log(req.fname);
      // console.log(req.role);
      next();
    }
  }

  // isUsername(req, res, next) {
  //   let userName = req.fname;
  //   return userName;
  // }

  isSuperUser(req, res, next) {
    if (req.role !== "superuser") {
      return res.json({ status: "auth_err_not_superuser" });
    }
    next();
  }

  // isUser(req, res, next) {
  //   if (req.role !== "user") {
  //     return res.json({ status: "auth_err_not_user" });
  //   }
  //   next();
  // }

//   authenticateComment(req, res, next) {
//     if (
//       (req.url === "/auth/comment" && req.method === "POST") ||
//       req.method === "PUT" ||
//       req.method === "DELETE"
//     ) {
//       if (req.body.fname !== req.fname) {
//         return res.json({ status: "auth_error" });
//       }
//     }
//     next();
//   }
}

module.exports = new Uaa();

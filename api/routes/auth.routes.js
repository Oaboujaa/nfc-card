const router = require("express").Router();
const controller = require("../controllers/auth.controller");


  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token,x-access-user_id, Origin, Content-Type, Accept"
    );
    next();
  });
  router.post("/login", controller.login);
  router.post("/logout", controller.logout);


module.exports = router;
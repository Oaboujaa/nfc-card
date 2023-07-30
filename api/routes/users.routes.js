
const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller.js");
const { authJwt } = require("../middleware");

  router.post("/",users.createOne);
  router.get("/",authJwt.verifyToken,users.findAll);
  router.get("/:id_user",authJwt.verifyToken,users.findOne);
  router.patch("/",authJwt.verifyToken, users.updateOne);
  router.delete("/:id_item",authJwt.verifyToken,users.RemoveOne);

  module.exports = router;


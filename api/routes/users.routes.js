
const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller.js");


  router.post("/",users.createOne);
  router.get("/",users.findAll);
  router.get("/:id_user",users.findOne);
  router.patch("/", users.updateOne);
  router.delete("/:id_item",users.RemoveOne);

  module.exports = router;


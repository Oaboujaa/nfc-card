
const express = require("express");
const router = express.Router();
const cards = require("../controllers/cards.controller.js");
const { multerMiddleware,authJwt }=require("../middleware")

  router.post("/",multerMiddleware.single('photo'),cards.createOne);
  router.get("/:id_user",authJwt.verifyToken,cards.findAll);
  router.get("/card/:id_card",cards.findOne);
  router.patch("/:id_card", cards.updateOne);
  router.delete("/:id_card",cards.RemoveOne);

  



  module.exports = router;

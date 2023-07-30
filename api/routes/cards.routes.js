
const express = require("express");
const router = express.Router();
const cards = require("../controllers/cards.controller.js");
const { multerMiddleware,authJwt }=require("../middleware")

  router.post("/",multerMiddleware.single('photo'),cards.createOne);
  router.get("/",authJwt.verifyToken,cards.findAll);
  router.get("/:id_card",cards.findOne);
  router.patch("/:id_card", cards.updateOne);
  router.delete("/:id_card",cards.RemoveOne);

  



  module.exports = router;

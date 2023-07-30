
const corsMiddleware = require("./cors");
const reqFormatMiddleware = require("./reqFormat");
const multerMiddleware = require("./multer");
module.exports = {
  multerMiddleware: multerMiddleware,
  reqFormatMiddleware:reqFormatMiddleware,
  corsMiddleware:corsMiddleware
};

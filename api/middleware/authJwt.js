const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const { frMessages, } = require("../constantes");
const tkncontroller = require("../controllers/token.controller");
const { sendResponse } = require("../functions/util");

verifyToken = (req, res, next) => {
//décomposition des cookies
var cookies = {};
  if (req.headers.cookie !== undefined) {
    req.headers && req.headers.cookie.split(';').forEach(function(cookie) {    
      var parts = cookie.match(/(.*?)=(.*)$/)
      cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
  }  
  

//exraction du token
  var token =  req.query.token || req.body.token || req.headers["x-access-token"]||cookies["token"];

// 1 verification si le token existe
  if (!token) {
    return sendResponse(res,200,"TOKEN_REQUIRED",{})
  }
// récupération du id_user
  //var id_user = req.query.id_user || req.body.id_user || req.headers["x-access-id_user"]||decodeURIComponent(cookies["id_user"]);
  var id_user =  req.headers["x-access-id_user"];
//décodage du token avec jwt

  jwt.verify(token, config.secret, (err, decoded) => {
    //on verifie que le token envoyé appartient bien a l'utilisateur qui l'a envoyé
    if(!decoded){
      return sendResponse(res,200,"TOKEN_INVALID",{})
    }
    if (id_user.toString() !== decoded.id_user.toString())
    {
      return sendResponse(res,200,"TOKEN_INVALID",{})
    }

  
    tkncontroller.findToken(id_user).then(data => {
      // on verifie dans la BD si cet utilisateur a encore son token
      if (data.count == 0) {
        return sendResponse(res,403,"TOKEN_REQUIRED",{})
      }
      // on verifie que le token envoyé est bien celui stocké
      if (data.rows[0].token != token) {
        return sendResponse(res,403,"TOKEN_INVALID",{})
      }
      req.id_user = decoded.id_user;
      next();
    }).catch(err => {
      return sendResponse(res,500,"ERROR_MESSAGE",{erreur:err.message})
    });
  });
};


const authJwt = {
  verifyToken: verifyToken
};
module.exports = authJwt;

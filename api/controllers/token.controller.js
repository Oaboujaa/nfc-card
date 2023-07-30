const db = require("../models");
const Token = db.tokens;
const { frMessages } = require("../constantes");

exports.createToken = (data) => {

    
    return Token.create({
        token: data.token,
        expiration: data.expiration,
        id_user:data.id_user
    })
      .then((token) => {
        console.log(">> Token Saved : ");
        return token;
      })
      .catch((err) => {
        console.log(">> Error while creating Token: ", err);
      });
  };

  exports.findToken = (userId) => {
    
    return Token.findAndCountAll({where: {id_user: userId}})
    .then(data => {
      return data
    })
    .catch(err => {
          console.log("Error : ",err.message)
 
    })
 
  };

  exports.removeToken = (userId) => {
  
    return Token.destroy({where: {id_user: userId}})
    .then(data => {
      return data
    })
    .catch(err => {
          console.log("Error : ",err.message)
 
    })
  };

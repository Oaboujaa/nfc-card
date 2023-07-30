//============================== Controlleur qui contient les fonctions liées à l'authentification ==============================


const config = require("../config/auth.config");
const { execQuery } = require("../config/db");
const mysql = require('mysql2')
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const tkncontroller = require("./token.controller");

const { sendResponse } = require("../functions/util");

//============================== fonction de login ==============================
exports.login = async(req, res) => {

  
  var email=req.body.data.email
  var password=req.query.password||req.body.data.password


  if(!email){
    return sendResponse(res,200,"MISSING_FIELDS",{})
    //return res.status(500).send({ message: frMessages.MISSING_FIELDS });
  }
  if(!password){
    return sendResponse(res,200,"MISSING_FIELDS",{})
  }
  // on vérifie si l'utilisateur existe

  let query = "Select * from users where email= ? "
  const search_query = mysql.format(query,[email])
  const results=await execQuery(search_query)

    if (!results.email) {
        return sendResponse(res,200,"LOGIN_INCORRECT",{})
    }
        //comparaison du mot de passe saisie avec celui enregistré
    var passwordIsValid = bcrypt.compareSync(password,results.password);

    if (!passwordIsValid) {
    return sendResponse(res,200,"PASSWORD_INCORRECT",{})
    }
    const tk=await tkncontroller.removeToken(results.id )
    console.log('first',tk)
    // validité du token
    var tokenExpiration=8640000 
    var token = jwt.sign({id_user: results.id }, config.secret, {expiresIn: tokenExpiration});
    var myToken={
        token: token,
        expiration: tokenExpiration,
        id_user:results.id
        }

    await tkncontroller.createToken(myToken)

    return sendResponse(res,200,"CONNECTED",myToken)

};

//============================== fonction de logout ==============================
 exports.logout = async (req,res) => {
 
    let userId =  req.headers["x-access-id_user"]||req.body.data.id_user||req.params.id_user

    if(!userId){
    return sendResponse(res,200,"MISSING_FIELDS",{})
    }
    
    await tkncontroller.removeToken(userId)
    return sendResponse(res,200,"LOGOUT_SUCCESS",{})

    

}; 
//============================== Controlleur qui contient les fonctions liées à l'authentification ==============================

const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const tkncontroller = require("./token.controller");
const { frMessages } = require("../constantes");
const { sendResponse } = require("../functions/util");

//============================== fonction de login ==============================
exports.login = async(req, res) => {

  
  var email=req.query.email||req.body.data.email
  var user_password=req.query.user_password||req.body.data.user_password


  if(!email){
    return sendResponse(res,200,"MISSING_FIELDS",{})
    //return res.status(500).send({ message: frMessages.MISSING_FIELDS });
  }
  if(!user_password){
    return sendResponse(res,200,"MISSING_FIELDS",{})
  }
  // on vérifie si l'utilisateur existe


  let query = "Select * from users where id= ? "
  const search_query = mysql.format(query,[req.params.id_card])
  const results=await execQuery(search_query)


  User.findOne({
    where: {
      email: email
    }
  })
    .then(user => {
      if (!user) {
        return sendResponse(res,200,"LOGIN_INCORRECT",{})
      }
      //comparaison du mot de passe saisie avec celui enregistré
      var passwordIsValid = bcrypt.compareSync(user_password,user.user_password);

      if (!passwordIsValid) {
        return sendResponse(res,200,"PASSWORD_INCORRECT",{})
      }

      // validité du token
      var tokenExpiration=8640000 
      var token = jwt.sign({id_user: user.id }, config.secret, {expiresIn: tokenExpiration});
      var myToken={
        token: token,
        expiration: tokenExpiration,
        id_user:user.id
      }
      //on vérifie si l'utilisateur à deja un token / déja connecté
      tkncontroller.findToken(user.id).then(data=>{

          if (data.count===0 || data==[]){
            // si pas de token on en crée un nouveau et on l'envoi à l'utilisateur
            tkncontroller.createToken(myToken).then(dt=>{
              var dataToSend={
                                id_user: user.id,
                                email: user.email,
                                accessToken: token
                              }

              return sendResponse(res,200,"LOGIN_SUCCESS",dataToSend)
            }).catch(err => {
              res.status(500).send({ message: err.message });
            })

          }else if(data.count==1){
            
            var dataToSend={
              id_user: user.id,
              email: user.email,
              email: user.email,
              roles: user.id_profile ,
              accessToken: data.rows[0].token
            }
            //si l'utilsiateur à deja un token  on voit s'il a le droit d'utilisé plusieur appareil en meme temps
            if(data.rows[0].dataValues.multisession===0){
              return sendResponse(res,200,"CONNECTED_NO_MULTI_SESSION",{})
            }else{
              return sendResponse(res,200,"CONNECTED_MULTI_SESSION",dataToSend)
            }          
          }  
      }) .catch(err => {
        return sendResponse(res,200,"ERROR_MESSAGE",{erreur:err.message})
      });


    })
    .catch(err => {
      return sendResponse(res,200,"ERROR_MESSAGE",{erreur:err.message})
    });
};

//============================== fonction de logout ==============================
exports.logout = (req,res) => {
 
  let userId =  req.headers["x-access-id_user"]

  if(!userId){
    return sendResponse(res,200,"MISSING_FIELDS",{})
  }
  

    tkncontroller.removeToken(userId).then(dt=>{  
      return sendResponse(res,200,"LOGOUT_SUCCESS",{})
    }).catch(err => {
      return sendResponse(res,200,"ERROR_MESSAGE",{message: err.message})
    })
  

};

const { sendResponse } = require("../functions/util");
const { execQuery } = require("../config/db");
const mysql = require('mysql2')
var bcrypt = require("bcryptjs");


exports.findOne = async (req, res) => {

    let query = "Select * from users where id= ? "
    const search_query = mysql.format(query,[req.params.id_user])
    const results=await execQuery(search_query)
    return sendResponse(res, 200, "DATA_SUCCESS", results);
  
    };

    
exports.createOne = async (req,res) => {
  const data=req.body.data

  let querya = "Select * from users where email= ? "
  const search_querya = mysql.format(querya,[data.email])
  const resultsa=await execQuery(search_querya)
  
  if (resultsa.email){
    return sendResponse(res, 200, "EXISTE DEJA", resultsa);
  }

  
  let query = 'INSERT INTO users ( `fullname`,`email`, `password`,`image`)'+
    ' VALUES (?,?,?,?)';
   let hashed_password=bcrypt.hashSync(data.password, 8)
  const values = [data.fullname, data.email, hashed_password, data.image];
  let search_query = mysql.format(query,values)
  let results=await execQuery(search_query) 
  return sendResponse(res, 200, "DATA_SUCCESS", results);
  };

  exports.findAll = (req, res) => {
   
  };

  exports.updateOne = async (req, res) => {
    const data=req.body.data
    let query = 'UPDATE users  set `fullname`=?,`email`=?,`password`=?,`image`=? where id=?';
     let hashed_password=bcrypt.hashSync(data.password, 8)
    const values = [data.fullname, data.email, hashed_password, data.image, data.id_user];
    let search_query = mysql.format(query,values)
    let results=await execQuery(search_query) 
    return sendResponse(res, 200, "DATA_SUCCESS", results);
  };

  
  exports.RemoveOne = (req, res) => {


  };
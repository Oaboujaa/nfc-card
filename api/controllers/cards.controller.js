
const { sendResponse,generateId } = require("../functions/util");
const { execQuery } = require("../config/db");
const mysql = require('mysql2')


exports.findOne = async (req, res) => {
  let query = "Select * from user_card where id= ? "
  const search_query = mysql.format(query,[req.params.id_card])
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);

  };

exports.createOne = async (req,res,user) => {
  const card_date = new Date();
  const image = req.file || ""
  const data=req.body
  let query = 'INSERT INTO user_card ( `rnd_id`,`full_name`, `email`, `phone_number`, `fonction` , `societe`, `website`, `theme`, `photo`, `youtube`, `linkedin`, `instagram`, `facebook`, `card_name`, `card_date`)'+
                                            ' VALUES ("000000",?, ?, ?,?, ?, ?,?, ?, ?,? ,? ,?, ?, ?)';
  const values = [data.full_name, data.email, data.phone_number, data.fonction, data.societe, data.website, data.theme,image.filename,data.youtube, data.linkedin, data.instagram,data.facebook, data.card_name, card_date];
  let search_query = mysql.format(query,values)
  let results=await execQuery(search_query) 
  const rndId=generateId(results.insertId)

  query = 'UPDATE user_card set rnd_id=? where id=?';
  search_query = mysql.format(query,[rndId,results.insertId])
  await execQuery(search_query)
  data.rndId=rndId
  data.insertId=results.insertId
  return sendResponse(res, 200, "DATA_SUCCESS", data);
  };

exports.findAll = async (req, res) => {
  const id_user=req.params.id_user
  let query = "Select * from user_card where id_user=?"
  const search_query = mysql.format(query,[id_user])
  console.log(search_query)
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);

  };

exports.updateOne =async  (req, res) => {
console.log("object")
  const data=req.body
  const query = 'UPDATE user_card SET `full_name`=?, `email`=?, `phone_number`=?, `fonction`=?, `societe`=?, `website`=?, `theme`=?, `photo`=?, `youtube`=?, `linkedin`=?, `instagram`=?, `card_name=?`, `facebook`=? where id=?'
  const values = [data.full_name, data.email, data.phone_number,data.fonction, data.societe, data.website, data.theme, data.photo,data.youtube, data.linkedin, data.instagram, data.card_name, data.facebook,req.params.id_card];
  const search_query = mysql.format(query,values)
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);

  };

  
exports.RemoveOne = async (req, res) => {

  let query = "DELETE from user_card where  id= ? "
  const search_query = mysql.format(query,[req.params.id_card])
  const results=await execQuery(search_query)
  return sendResponse(res, 200, "DATA_SUCCESS", results);


  };
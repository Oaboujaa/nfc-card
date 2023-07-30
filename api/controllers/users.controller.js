
const { sendResponse } = require("../functions/util");
const { execQuery } = require("../config/db");
const mysql = require('mysql2')

exports.findOne = async (req, res) => {

    let query = "Select * from users where id= ? "
    const search_query = mysql.format(query,[req.params.id_user])
    const results=await execQuery(search_query)
    return sendResponse(res, 200, "DATA_SUCCESS", results);
  
    };

    
exports.createOne = (req,res,user) => {

  };

  exports.findAll = (req, res) => {

  };

  exports.updateOne = (req, res) => {

  };

  
  exports.RemoveOne = (req, res) => {


  };
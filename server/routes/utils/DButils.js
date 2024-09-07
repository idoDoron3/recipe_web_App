require("dotenv").config();
const MySql = require("./MySql");

exports.execQuery = async function (query) {
    let returnValue = []
const connection = await MySql.connection();
    try {

    console.log("Starting transaction...");
    await connection.query("START TRANSACTION");
    returnValue = await connection.query(query);

    // console.log("Query executed successfully:", query);
    await connection.query("COMMIT");
    console.log("Transaction committed.");


  } catch (err) {
    await connection.query("ROLLBACK");
    console.log('ROLLBACK at querySignUp', err);
    throw err;
  } finally {
    await connection.release();
    
    // console.log("Connection released.");

  }
  return returnValue
}


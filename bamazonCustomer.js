var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bsc0BSC0",
    database: "bamazon"
});

connection.connect(function(err, results) {
  if (err) throw err;
  start();
});

function start() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.table(results);
    buy();
  });
}

function buy() {
  inquirer.prompt([
    {
      name: "buy_id",
      type: "input",
      message: "ItemID of product?"
    },
    {
      name: "buy_qty",
      type: "input",
      message: "Quantity of product to buy?"
    }
  ]).then(function(answer) {
    connection.query("SELECT * FROM products WHERE item_id = ?", [answer.buy_id], function(err, res) {
      if (err) throw err;
      var old_stock = res[0].stock_qty;
      var new_stock = old_stock - answer.buy_qty;
      var price = res[0].price;

      if (new_stock < 0) {
        console.log("\n======================");
        console.log("Insufficient quantity!");
        console.log("======================");
        // buy();

      } else {
        connection.query('UPDATE products SET stock_qty = ? WHERE item_id = ?', [new_stock, answer.buy_id], function(err, response) {
          if (err) throw err;
          console.log("\n=======================");
          console.log("Total Purchase: $" + answer.buy_qty * price);
          console.log("=======================");
        })
      }

      connection.end();

    })
  })
}
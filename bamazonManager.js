var mysql = require("mysql");
var inquirer = require("inquirer");

var depts = ["Appliances", "Beauty & Personal Care", "Books", "Clothing & Shoes", "Electronics", "Grocery & Food", "Home & Kitchen", "Movies & TV", "Sports & Outdoors", "Video Games"];

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
  inquirer.prompt(
    {
      name: "action",
      type: "list",
      message: "Manager Options",
      choices: ["View Products", "View Low Inventory", "Reorder Low Inventory", "Add New Product", "Exit"]
    }
  ).then(function(answer) {
    switch(answer.action) {
      case "View Products":
        viewProducts();
        break;
      case "View Low Inventory":
        viewLowInventory();
        break;
      case "Reorder Low Inventory":
        orderInventory();
        break;
      case "Add New Product":
        addProduct();
        break;
      case "Exit":
      default:
        connection.end();
    }
  })
}

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function viewLowInventory() {
  connection.query("SELECT * FROM products WHERE stock_qty < 20", function(err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function orderInventory() {
  connection.query("SELECT * FROM products WHERE stock_qty < 20", function(err, results) {
    if (err) throw err;

    inquirer.prompt({
      name: "action",
      type: "rawlist",
      message: "Select the low inventory product to order (25) units",
      choices: function() {
        var choiceArray = [];
        for (var i = 0; i < results.length; i++) {
          choiceArray.push(results[i].item_id);
        }
        return choiceArray;
      }
    }).then(function(answer) {
      var new_stock = 0;
      connection.query("SELECT * FROM products WHERE item_id = ?", [answer.action], function(err, res) {
        if (err) throw err;
        new_stock = res[0].stock_qty + 25;
        updateInventory(answer.action, new_stock);
      });
    })
  })
}

function updateInventory(item_id, new_stock) {
  connection.query("UPDATE products SET stock_qty = " + new_stock + " WHERE item_id = ?", [item_id], function(err, response) {
    if (err) throw err;
    console.log("\n==========================================");
    console.log("#" + item_id + " stock  + (25) units || New Stock: " + new_stock);
    console.log("==========================================\n");
    start();
  });
}

function addProduct() {
  

  inquirer.prompt([
    {
      name: "product_name",
      type: "input",
      message: "Product name? (<30 characters)"
    },
    {
      name: "department_name",
      type: "list",
      message: "Department name?",
      choices: depts
    },
    {
      name: "price",
      type: "input",
      message: "Price?"
    },
    {
      name: "stock_qty",
      type: "input",
      message: "Stock quantity? (<6 digits)"
    }
  ]).then(function(answer) {
    connection.query("INSERT INTO products (product_name, department_name, price, stock_qty) VALUES (?, ?, ?, ?)", [answer.product_name, answer.department_name, answer.price, answer.stock_qty], function(err, results) {
      if (err) throw err;
      console.log("\n============================================");
      console.table("PRODUCT (" + answer.product_name + ") successfully added!");
      console.log("============================================\n");
      start();
    }); 
  });
}
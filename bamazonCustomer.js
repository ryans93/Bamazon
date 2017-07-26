var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

var itemIds = [];

connection.connect(function (err) {
    if (err) console.log(err);
    start();
});

function start() {

    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\t" + res[i].product_name + "\t$" + res[i].price + "\t" + res[i].stock_quantity + " left in stock");
            console.log("----------------------------------------------------------------------");
            itemIds.push(res[i].item_id);
            if (i == res.length - 1) beginQuery();
        }
    });
}

function beginQuery() {
    var selectItem = {
        name: "itemList",
        type: 'input',
        message: "Enter item ID of item you want to purchase."
    }

    inquirer.prompt([selectItem]).then(function (answers) {
        if (itemIds.indexOf(answers.itemList != -1)) selectQuantity(answers.itemList);
        else {
            console.log("Invalid id entered");
            beginQuery();
        }
    });
}

function selectQuantity(itemID) {
    var stock = 0;
    var price=0;
    connection.query("SELECT * FROM products WHERE item_id=?", itemID, function (err, res) {
        stock = res[0].stock_quantity;
        price=res[0].price;
    });
    var askQuantity = {
        type: "input",
        message: "Select quantity to purchase",
        name: "quantityInput"
    }

    inquirer.prompt([askQuantity]).then(function (answers) {
        if (answers.quantityInput <= stock) {
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [{ stock_quantity: stock - answers.quantityInput },
                { item_id: itemID }],
                function (err, res) {
                    console.log(res.affectedRows + " products updated!\n");
                }
            );
            console.log("Thank you for your order");
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [{ product_sales: parseFloat(price) * parseInt(answers.quantityInput) },
                { item_id: itemID }],
                function (err, res) {
                    console.log(res.affectedRows + " product sales updated!\n");
                    start();
                });
        }
        else {
            console.log("Insufficient stock for this order.");
            beginQuery();
        }
    });
}
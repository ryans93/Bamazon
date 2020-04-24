var mysql = require("mysql");
var inquirer = require("inquirer");

// set up mysql connection
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

// find all products and display them to user
function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\t" + res[i].product_name + "\t$" + res[i].price + "\t" + res[i].stock_quantity + " left in stock");
            console.log("----------------------------------------------------------------------");
            itemIds.push(res[i].item_id.toString());
        }
        beginQuery();
    });
}

// allow user to enter id of item they wish to purchase
function beginQuery() {
    var selectItem = {
        name: "itemList",
        type: 'input',
        message: "Enter item ID of item you want to purchase."
    };

    inquirer.prompt([selectItem]).then(function (answers) {
        if (itemIds.indexOf(answers.itemList) != -1) {
            selectQuantity(answers.itemList);
        }
        // restart if user enters invalid item id
        else {
            console.log("Invalid id entered");
            beginQuery();
        }
    });
}

// allow user to select qty of item
function selectQuantity(itemID) {
    var stock = 0;
    var price = 0;
    // get stock and price of selected item
    connection.query("SELECT * FROM products WHERE item_id=?", itemID, function (err, res) {
        stock = res[0].stock_quantity;
        price = res[0].price;

        var askQuantity = {
            type: "input",
            message: "Select quantity to purchase",
            name: "quantityInput"
        };

        inquirer.prompt([askQuantity]).then(function (answers) {
            if (answers.quantityInput <= stock) {
                // update product stock
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{ stock_quantity: stock - answers.quantityInput },
                    { item_id: itemID }],
                    function (err, res) {
                        //console.log(res.affectedRows + " products updated!");
                        console.log("Your total is $" + (answers.quantityInput * price).toFixed(2));
                        console.log("Thank you for your order!\n");
                        // update product sales
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [{ product_sales: parseFloat(price) * parseInt(answers.quantityInput) },
                            { item_id: itemID }],
                            function (err, res) {
                                //console.log(res.affectedRows + " product sales updated!\n");
                                exit();
                            }
                        );
                    }
                );
            }
            // restart order if there is insufficient stock
            else {
                console.log("Insufficient stock for this order.");
                beginQuery();
            }
        });
    });
}

// allow user to order another item or quit
function exit() {
    var menu = {
        name: "option",
        type: 'list',
        message: "Would you like to coninue shopping?",
        choices: ["Yes", "No"]
    };

    inquirer.prompt([menu]).then(function (answers) {
        if (answers.option === "Yes"){
            start();
        }
        else{
            console.log("Thank you for shopping at Bamazon!");
            process.exit(0);
        }
    });
}
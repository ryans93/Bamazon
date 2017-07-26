var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) console.log(err);
    start();
});

function start() {
    var mainMenu = {
        name: "menuOption",
        type: 'list',
        message: "Select an option.",
        choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }

    inquirer.prompt([mainMenu]).then(function (answers) {
        if (answers.menuOption == "View Products") {
            viewProducts();
        }
        if (answers.menuOption == "View Low Inventory") {
            viewLow();
        }
        if (answers.menuOption == "Add to Inventory") {
            addInventory();
        }
        if (answers.menuOption == "Add New Product") {
            addProduct();
        }
    });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\t" + res[i].product_name + "\t$" + res[i].price + "\t" + res[i].stock_quantity + " left in stock");
            console.log("----------------------------------------------------------------------");
            if (i == res.length - 1) start();
        }
    });
}

function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity<5", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\t" + res[i].product_name + "\t$" + res[i].price + "\t" + res[i].stock_quantity + " left in stock");
            console.log("----------------------------------------------------------------------");
            if (i == res.length - 1) start();
        }
    });
}

function addInventory() {
    var selectItem = {
        name: "addStock",
        type: 'input',
        message: "Enter item ID of item being stocked."
    }

    var askQuantity = {
        type: "input",
        message: "Select quantity to add.",
        name: "quantityInput"
    }

    inquirer.prompt([selectItem, askQuantity]).then(function (answers) {
        var stock = 0;
        connection.query("SELECT * FROM products WHERE item_id=?", answers.addStock, function (err, res) {
            stock = res[0].stock_quantity;
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [{ stock_quantity: parseInt(stock) + parseInt(answers.quantityInput) },
                { item_id: answers.addStock }],
                function (err, res) {
                    console.log(res.affectedRows + " products updated!\n");
                    start();
                });
        });
    });
}

function addProduct() {
    var name = {
        name: "name",
        type: 'input',
        message: "Enter product name."
    }
    var department = {
        name: "department",
        type: 'input',
        message: "Enter department."
    }
    var price = {
        name: "price",
        type: 'input',
        message: "Enter price per unit."
    }
    var stock = {
        name: "stock",
        type: 'input',
        message: "Enter available stock."
    }

    inquirer.prompt([name, department, price, stock]).then(function (answers) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answers.name,
                department_name: answers.department,
                price: answers.price,
                stock_quantity: answers.stock
            },
            function (err, res) {
                console.log(res.affectedRows + " product inserted!\n");
                start();
            }
        );
    });
}
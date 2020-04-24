var mysql = require("mysql");
var inquirer = require("inquirer");

//set up mysql connection
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

// main menu for user
function start() {
    var mainMenu = {
        name: "menuOption",
        type: 'list',
        message: "Select an option.",
        choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    };

    inquirer.prompt([mainMenu]).then(function (answers) {
        switch (answers.menuOption) {
            case "View Products":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLow();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Exit":
                process.exit(0);
                break;
        }
    });
}

// shows all products
function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\t" + res[i].product_name + "\t$" + res[i].price + "\t" + res[i].stock_quantity + " left in stock");
            console.log("----------------------------------------------------------------------");
        }
        start();
    });
}

// shows products with stock < 5
function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity<5", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\t" + res[i].product_name + "\t$" + res[i].price + "\t" + res[i].stock_quantity + " left in stock");
            console.log("----------------------------------------------------------------------");
        }
        start();
    });
}

// allow user to select an item and add to its stock
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
        // select item to get current qty
        connection.query("SELECT * FROM products WHERE item_id=?", answers.addStock, function (err, res) {
            if (err){
                console.log("Item ID not found");
                start();
            }
            stock = res[0].stock_quantity;
            // update stock with new qty 
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

// allow user to insert new product
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
                stock_quantity: answers.stock,
                product_sales: 0
            },
            function (err, res) {
                console.log(res.affectedRows + " product inserted!\n");
                start();
            }
        );
    });
}
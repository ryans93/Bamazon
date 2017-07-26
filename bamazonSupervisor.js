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
        choices: ["View Product Sales By Department", "Add New Department"]
    }

    inquirer.prompt([mainMenu]).then(function (answers) {
        if (answers.menuOption == "View Product Sales By Department") {
            viewDepartmentSales();
        }
        if (answers.menuOption == "Add New Department") {
            addDepartment();
        }
    });
}

function addDepartment() {
    var name = {
        name: "name",
        type: 'input',
        message: "Enter department name."
    }

    var overhead = {
        type: "input",
        message: "Enter overhead costs.",
        name: "overhead"
    }

    inquirer.prompt([name, overhead]).then(function (answers) {
        connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: answers.name,
                over_head_costs: answers.overhead
            },
            function (err, res) {
                console.log(res.affectedRows + " department inserted!\n");
                start();
            }
        );
    });
}

function viewDepartmentSales() {
    var Table = require('cli-table');
    var table = new Table({
        head: ['department_id', 'department_name', "over_head_costs", "product_sales", "total_profit"]
    });

    var groupBy = "SELECT department_name, SUM(product_sales) AS Department_Sales FROM products GROUP BY department_name;"
    var join = "SELECT departments.`department_id`, departments.`department_name`, departments.`over_head_costs`, products.`Department-Sales` FROM departments INNER JOIN products WHERE departments.`department_name`=products.`department_name`"

    connection.query(, function (err, res) {
        if (err) return console.log(err);
        console.log(res);

        for (var i = 0; i < res.length; i++) {
            var id = res[i].department_id;
            var name = res[i].department_name;
            var overHead = res[i].over_head_costs;
            var departmentSales = res[i].Department_Sales
            var profit = parseInt(res[i].Department_Sales) - parseInt(res[i].over_head_costs)
            table.push([id, name, overHead, departmentSales, profit]);
        }
    });
}
var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "eloquentSql#125",
  database: "bamazon"
});


inquirer.prompt([
		{
			type: 'list',
			name: 'option',
			message: 'Please select an option:',
			choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
		}
	]).then(function(input) {




function viewItemsForSale() {


}


function viewLowInventory() {
connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, inventory) {

}


function addToInventory() {


}

function addNewProduct() {
  inquirer.prompt([
                    {
                         type: "input",
                         message: "What name of the product you would like to add?",
                         name: "ProductName"
                    },
                    {
                         type: "input",
                         message: "What department does this item belong in?",
                         name: "DepartmentName"
                    },
                    {
                         type: "input",
                         message: "What is the price of the item you would like to add to the inventory?",
                         name: "Price"
                    },
                    {
                         type: "input",
                         message: "How many items should we add to the inventory of that item?",
                         name: "StockQuantity"
                    }
          ]).then(function (newItem) {

}